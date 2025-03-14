'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: 'fas fa-bolt',
    title: '快速分析',
    description: '无需注册登录，即刻开始文本分析，快速获取需求洞察',
  },
  {
    icon: 'fas fa-brain',
    title: 'AI驱动',
    description: '基于OpenAI先进算法，智能解析文本中的潜在需求',
  },
  {
    icon: 'fas fa-chart-line',
    title: '数据驱动',
    description: '提供数据支持的决策建议，降低创新风险',
  },
];

const scenarios = [
  {
    icon: 'fas fa-lightbulb',
    title: '产品创意验证',
    description: '快速验证产品创意的市场潜力',
  },
  {
    icon: 'fas fa-comments',
    title: '用户反馈分析',
    description: '批量分析用户反馈，提炼关键需求',
  },
  {
    icon: 'fas fa-search',
    title: '市场调研',
    description: '解析市场调研数据，发现机会',
  },
  {
    icon: 'fas fa-chart-pie',
    title: '竞品分析',
    description: '提取竞品分析报告中的关键信息',
  },
];
// tailwind.config = {
export default (function Home() {
  return (
    <div>
      {/* Hero部分 */}
      <section className="section-spacing relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary/90">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 animate-fade-in text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              <span className="inline-block animate-float">AI</span>驱动的
              <span className="bg-white bg-clip-text text-transparent">
                需求挖掘
              </span>
              工具
            </h1>
            <p className="mb-8 animate-slide-up text-lg text-white/90 opacity-90 md:text-xl">
              通过人工智能技术，从文本中智能提炼市场机遇与产品需求洞察
            </p>
            <div className="flex animate-fade-in flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="btn-primary shadow-glow hover:animate-pulse-glow"
              >
                <Link href="/analysis">开始分析</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white  transition-all duration-300 hover:bg-white hover:text-primary"
              >
                <Link href="/help">使用教程</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 特点介绍 */}
      <section className="section-spacing bg-background">
        <div className="container">
          <h2 className="title-decorated mb-12 text-center text-3xl font-bold">
            核心特点
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="card-interactive group"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <CardContent className="p-6">
                  <div className="icon-box mb-4 group-hover:bg-primary group-hover:text-white">
                    <i className={`${feature.icon} text-xl`} />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold group-hover:text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-text-medium group-hover:text-primary/80">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 使用场景 */}
      <section className="section-spacing bg-white">
        <div className="container">
          <h2 className="title-decorated mb-12 text-center text-3xl font-bold">
            适用场景
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {scenarios.map((scenario, index) => (
              <div
                key={scenario.title}
                className="group animate-slide-up rounded-lg p-6 text-center transition-colors duration-300 hover:bg-primary/5"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="icon-box-lg mx-auto mb-4 group-hover:bg-primary group-hover:text-white">
                  <i className={`${scenario.icon} text-2xl`} />
                </div>
                <h3 className="mb-2 font-semibold group-hover:text-primary">
                  {scenario.title}
                </h3>
                <p className="text-text-medium group-hover:text-primary/80">
                  {scenario.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA部分 */}
      <section className="section-spacing">
        <div className="container">
          <div className="gradient-border animate-pulse-glow">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary via-accent to-primary/90 p-12 text-center">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
              <div className="relative">
                <h2 className="mb-6 animate-float text-3xl font-bold text-white">
                  准备好开始了吗？
                </h2>
                <p className="mb-8 text-lg text-white/90">
                  立即体验AI驱动的需求挖掘工具，发现更多创新机会
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary shadow-glow hover:animate-pulse-glow hover:bg-white/90"
                >
                  <Link href="/analysis">免费开始使用</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
