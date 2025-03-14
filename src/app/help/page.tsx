import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Layout } from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function HelpPage() {
  return (
    <div>
      <main className="pt-16">
        {/* Hero部分 */}
        <section className="bg-gradient-to-r from-primary to-accent py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold">帮助中心</h1>
              <p className="mb-8 text-lg text-white opacity-90">
                了解如何使用 InsightMiner
                进行需求分析，获取使用技巧和常见问题解答
              </p>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="搜索帮助文档..."
                  className="w-full rounded-lg px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                  <i className="fas fa-search text-text-medium"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-5xl">
            {/* 快速入门 */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold">快速入门</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <QuickStartCard
                  icon="rocket"
                  title="新手指南"
                  description="了解 InsightMiner 的基本功能和使用流程"
                />
                <QuickStartCard
                  icon="book"
                  title="使用教程"
                  description="详细的功能说明和操作指南"
                />
                <QuickStartCard
                  icon="lightbulb"
                  title="使用技巧"
                  description="提高分析效率的实用技巧"
                />
              </div>
            </section>

            {/* 常见问题 */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold">常见问题</h2>
              <Accordion
                type="single"
                collapsible
                className="rounded-lg bg-white shadow-md"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-4">
                    如何开始第一次需求分析？
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-text-medium">
                    <p>
                      1.
                      点击首页的&quot;开始分析&quot;按钮或导航栏的&quot;需求分析&quot;
                    </p>
                    <p>2. 在文本输入框中输入您要分析的内容</p>
                    <p>3. 点击&quot;开始分析&quot;按钮，等待分析结果</p>
                    <p>4. 查看分析结果，可以导出或保存到历史记录</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-4">
                    支持哪些文件格式？
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-text-medium">
                    <p>目前支持以下文件格式：</p>
                    <ul className="mt-2 list-inside list-disc">
                      <li>文本文件 (.txt)</li>
                      <li>Word文档 (.docx)</li>
                      <li>PDF文件 (.pdf)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-4">
                    如何导出分析结果？
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-text-medium">
                    <p>在分析结果页面，您可以：</p>
                    <ul className="mt-2 list-inside list-disc">
                      <li>点击&quot;导出PDF报告&quot;按钮导出完整报告</li>
                      <li>点击&quot;导出Excel&quot;按钮导出数据表格</li>
                      <li>使用&quot;分享结果&quot;功能生成分享链接</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-4">
                    如何管理历史记录？
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-text-medium">
                    <p>在历史记录页面，您可以：</p>
                    <ul className="mt-2 list-inside list-disc">
                      <li>查看所有历史分析记录</li>
                      <li>使用搜索和筛选功能找到特定记录</li>
                      <li>编辑或删除单条记录</li>
                      <li>清空所有历史记录</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* 使用教程 */}
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold">使用教程</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TutorialCard
                  title="快速开始教程"
                  description="了解 InsightMiner 的基本功能和操作流程"
                />
                <TutorialCard
                  title="高级功能教程"
                  description="深入了解数据分析和可视化功能"
                />
              </div>
            </section>

            {/* 联系支持 */}
            <section className="rounded-lg bg-white p-8 shadow-md">
              <div className="text-center">
                <h2 className="mb-4 text-2xl font-bold">需要更多帮助？</h2>
                <p className="mb-6 text-text-medium">
                  如果您在使用过程中遇到任何问题，欢迎联系我们的客服团队
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button className="inline-flex items-center">
                    <i className="far fa-envelope mr-2"></i>
                    发送邮件
                  </Button>
                  <Button
                    variant="outline"
                    className="inline-flex items-center"
                  >
                    <i className="far fa-comment-dots mr-2"></i>
                    在线客服
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function QuickStartCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href="#"
      className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary bg-opacity-10">
        <i className={`fas fa-${icon} text-xl text-primary`}></i>
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-text-medium">{description}</p>
    </a>
  );
}

function TutorialCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <div className="flex h-full w-full items-center justify-center bg-primary bg-opacity-10">
          <i className="fas fa-play-circle text-4xl text-primary"></i>
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-text-medium">{description}</p>
        <a href="#" className="text-primary hover:text-accent">
          观看视频 <i className="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>
  );
}
