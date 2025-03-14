import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center">
              <i className="fas fa-lightbulb mr-3 text-2xl text-primary" />
              <span className="text-xl font-semibold text-primary">
                InsightMiner
              </span>
            </div>
            <p className="text-text-medium">
              基于人工智能技术的轻量化在线需求挖掘工具，助力产品创新与市场决策
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/analysis"
                  className="text-text-medium hover:text-primary"
                >
                  需求分析
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className="text-text-medium hover:text-primary"
                >
                  历史记录
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-text-medium hover:text-primary"
                >
                  使用教程
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-text-medium hover:text-primary"
                >
                  关于我们
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">联系我们</h3>
            <ul className="space-y-2">
              <li className="text-text-medium">
                <i className="far fa-envelope mr-2" />
                contact@insightminer.com
              </li>
              <li className="mt-4 flex space-x-4">
                <a href="#" className="text-text-medium hover:text-primary">
                  <i className="fab fa-github text-xl" />
                </a>
                <a href="#" className="text-text-medium hover:text-primary">
                  <i className="fab fa-twitter text-xl" />
                </a>
                <a href="#" className="text-text-medium hover:text-primary">
                  <i className="fab fa-linkedin text-xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-text-medium">
          <p>© 2025 InsightMiner 团队. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}
