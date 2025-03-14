'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Hero部分 */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary/90 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold">关于 InsightMiner</h1>
            <p className="text-lg text-white opacity-90">
              我们致力于通过人工智能技术，帮助企业和个人更高效地挖掘需求洞察，
              为产品创新和市场决策提供数据支持
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* 我们的故事 */}
          <section className="mb-8 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold">我们的故事</h2>
            <div className="space-y-4 text-text-medium">
              <p>
                InsightMiner
                诞生于2025年，源于我们团队在产品开发过程中的深刻体会。我们发现，传统的需求分析方法往往耗时费力，
                且容易受主观因素影响。
              </p>
              <p>
                为了解决这个问题，我们决定开发一款基于人工智能的需求挖掘工具，通过先进的自然语言处理技术，
                帮助用户从海量文本中快速提取有价值的需求洞察。
              </p>
              <p>
                经过不断的技术创新和用户反馈优化，InsightMiner
                已经发展成为一个强大的需求分析平台，
                服务于众多产品经理、创业者和市场研究人员。
              </p>
            </div>
          </section>

          {/* 核心技术 */}
          <section className="mb-8 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold">核心技术</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TechCard
                icon="brain"
                title="AI 驱动分析"
                description="采用OpenAI先进算法，实现智能文本理解和需求提取，准确度高达95%"
              />
              <TechCard
                icon="chart-network"
                title="深度学习模型"
                description="基于大规模数据训练的深度学习模型，持续优化分析效果"
              />
              <TechCard
                icon="chart-pie"
                title="数据可视化"
                description="直观的数据展示方式，帮助用户快速理解分析结果"
              />
              <TechCard
                icon="shield-alt"
                title="数据安全"
                description="采用先进的加密技术，确保用户数据安全"
              />
            </div>
          </section>

          {/* 团队介绍 */}
          <section className="mb-8 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold">核心团队</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <TeamMember
                name="张明"
                title="创始人 & CEO"
                description="前Google产品经理，10年产品开发经验"
              />
              <TeamMember
                name="李华"
                title="技术总监"
                description="AI领域专家，前OpenAI研究员"
              />
              <TeamMember
                name="王芳"
                title="产品设计师"
                description="8年用户体验设计经验"
              />
            </div>
          </section>

          {/* 联系我们 */}
          <section className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold">联系我们</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-semibold">联系方式</h3>
                <ul className="space-y-3 text-text-medium">
                  <li className="flex items-center">
                    <i className="far fa-envelope w-6 text-primary"></i>
                    <span>contact@insightminer.com</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-phone w-6 text-primary"></i>
                    <span>400-888-8888</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt w-6 text-primary"></i>
                    <span>北京市海淀区中关村科技园</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <h3 className="mb-4 font-semibold">关注我们</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-text-medium hover:text-primary">
                      <i className="fab fa-github text-xl"></i>
                    </a>
                    <a href="#" className="text-text-medium hover:text-primary">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="#" className="text-text-medium hover:text-primary">
                      <i className="fab fa-linkedin text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-4 font-semibold">发送消息</h3>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <Label className="mb-1 text-sm font-medium text-text-medium">
                      姓名
                    </Label>
                    <Input type="text" className="w-full" />
                  </div>
                  <div>
                    <Label className="mb-1 text-sm font-medium text-text-medium">
                      邮箱
                    </Label>
                    <Input type="email" className="w-full" />
                  </div>
                  <div>
                    <Label className="mb-1 text-sm font-medium text-text-medium">
                      消息
                    </Label>
                    <Textarea rows={4} className="w-full" />
                  </div>
                  <Button type="submit" className="w-full">
                    发送消息
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function TechCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-background p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary bg-opacity-10">
        <i className={`fas fa-${icon} text-xl text-primary`}></i>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-text-medium">{description}</p>
    </div>
  );
}

function TeamMember({
  name,
  title,
  description,
}: {
  name: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary bg-opacity-10">
        <i className="fas fa-user text-2xl text-primary"></i>
      </div>
      <h3 className="mb-1 font-semibold">{name}</h3>
      <p className="mb-2 text-text-medium">{title}</p>
      <p className="text-sm text-text-medium">{description}</p>
    </div>
  );
}
