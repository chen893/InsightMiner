import OpenAI from 'openai';
import { prisma } from '../context';

// 定义更新数据类型
interface AnalysisUpdateData {
  status?: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
  error?: string;
  analysisTime?: number;
  [key: string]: unknown;
}

// 发送分析更新的函数
// 由于目前未实现，使用空函数，忽略参数
const sendAnalysisUpdate = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _analysisId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _data: AnalysisUpdateData
) => {};

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_URL,
});

// 分析结果类型
type ResultType =
  | 'core_need'
  | 'potential_opportunity'
  | 'market_trend'
  | 'pain_point'
  | 'solution';

// 分析文本并生成结果
export async function analyzeText(analysisId: string, text: string) {
  try {
    // 更新分析状态为处理中
    await sendAnalysisUpdate(analysisId, {
      status: 'processing',
      progress: 10,
    });

    // 记录开始时间
    const startTime = Date.now();

    // 构建提示词
    const prompt = `
    请分析以下文本，提取关键信息并按以下类别组织。必须以严格有效的JSON格式返回结果，不要包含任何额外的文字说明或Markdown格式。

    返回的JSON必须包含以下字段：
    1. title: 一个字符串，总结整个分析的主题或核心问题
    2. 5个类别键，每个键对应一个数组，数组中包含2-3个对象，每个对象必须有title和content两个字段：

    {
      "title": "分析主题",
      "core_need": [
        {"title": "标题1", "content": "详细内容1"},
        {"title": "标题2", "content": "详细内容2"}
      ],
      "potential_opportunity": [
        {"title": "标题1", "content": "详细内容1"},
        {"title": "标题2", "content": "详细内容2"}
      ],
      "market_trend": [
        {"title": "标题1", "content": "详细内容1"},
        {"title": "标题2", "content": "详细内容2"}
      ],
      "pain_point": [
        {"title": "标题1", "content": "详细内容1"},
        {"title": "标题2", "content": "详细内容2"}
      ],
      "solution": [
        {"title": "标题1", "content": "详细内容1"},
        {"title": "标题2", "content": "详细内容2"}
      ]
    }

    分析要求：
    1. title: 一句话概括整个文本的核心主题或问题
    2. 核心需求 (core_need)：客户基本需要解决的问题
    3. 潜在机会 (potential_opportunity)：文本中暗示的商业或发展机会
    4. 市场趋势 (market_trend)：行业或市场的发展趋势
    5. 痛点 (pain_point)：用户或业务面临的困难和挑战
    6. 解决方案 (solution)：可能的基于互联网的解决方案，如网站、平台、小程序或APP

    请分析的文本内容：
    ${text}
    `;

    // 发送进度更新
    await sendAnalysisUpdate(analysisId, { progress: 30 });

    // 调用OpenAI API

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_API_MODEL || 'deepseek-ai/DeepSeek-V3',
      messages: [
        {
          role: 'system',
          content:
            '你是一个专业的需求分析助手，擅长从文本中提取关键信息并进行分类。你必须严格按照要求返回有效的JSON格式数据，不得添加任何额外文本或说明。',
        },
        { role: 'user', content: prompt },
      ],
      // response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    // 发送进度更新
    await sendAnalysisUpdate(analysisId, { progress: 70 });

    // 解析返回的内容
    const responseContent = completion.choices[0].message.content;
    let analysisResults;

    try {
      analysisResults = JSON.parse(responseContent || '{}');
    } catch (error) {
      console.error('解析OpenAI响应失败:', error);
      throw new Error('解析分析结果失败');
    }

    // 保存分析结果到数据库
    const resultPromises = [];

    // 获取并保存整体标题
    const title = analysisResults.title || '未命名分析';

    // 处理每种类型的结果
    for (const type of [
      'core_need',
      'potential_opportunity',
      'market_trend',
      'pain_point',
      'solution',
    ] as ResultType[]) {
      const items = analysisResults[type] || [];

      for (const item of items) {
        resultPromises.push(
          prisma.result.create({
            data: {
              analysisId,
              type,
              title: item.title || '未命名',
              content: item.content || '',
            },
          })
        );
      }
    }

    await Promise.all(resultPromises);

    // 计算分析耗时（秒）
    const analysisTime = Math.round((Date.now() - startTime) / 1000);

    // 更新分析状态为已完成
    await prisma.analysis.update({
      where: { id: analysisId },
      data: {
        status: 'completed',
        analysisTime,
        title: title,
      },
    });

    // 发送完成通知
    await sendAnalysisUpdate(analysisId, {
      status: 'completed',
      progress: 100,
      analysisTime,
    });

    return { success: true };
  } catch (error) {
    console.error('分析过程出错:', error);

    // 更新分析状态为错误
    await prisma.analysis.update({
      where: { id: analysisId },
      data: {
        status: 'error',
      },
    });

    // 发送错误通知
    await sendAnalysisUpdate(analysisId, {
      status: 'error',
      error: error instanceof Error ? error.message : '未知错误',
    });

    return { success: false, error };
  }
}
