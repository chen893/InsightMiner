# Next.js 全栈项目

## 项目要求

### 技术栈

- 框架：Next.js (App Router)
- 包管理：pnpm
- 状态管理：Zustand
- 数据获取：SWR
- ORM：Prisma
- 数据库：PostgreSQL
- API：tRPC
- UI 框架：Tailwind CSS
- UI 组件库：shadcn/ui
- 代码规范：ESLint、Prettier
- Git 工作流：Husky

### 项目结构要求

```
my-next-app/
├── app/                      # Next.js 应用路由目录 (App Router)
│   ├── (api)/                # API 路由分组（可选，根据需要创建）
│   │   └── api/              # 具体的 API 路由
│   │       └── trpc/         # tRPC 路由
│   │           └── [trpc]/  # tRPC 动态路由
│   │               └── route.ts
│   ├── (marketing)/          # 市场/营销页面分组（可选，根据需要创建）
│   │   ├── about/            # 关于页面
│   │   │   └── page.tsx
│   │   ├── contact/          # 联系页面
│   │   │   └── page.tsx
│   │   └── layout.tsx        # 市场/营销页面的布局
│   ├── (dashboard)/          # 仪表盘页面分组（可选，根据需要创建）
│   │   ├── settings/         # 设置页面
│   │   │   └── page.tsx
│   │   ├── profile/          # 个人资料页面
│   │   │   └── page.tsx
│   │   └── layout.tsx        # 仪表盘页面的布局
│   ├── globals.css           # 全局样式文件
│   ├── layout.tsx            # 全局布局文件
│   └── page.tsx              # 主页（例如：/）
├── components/               # 可复用的 UI 组件
│   ├── ui/                   # shadcn/ui 组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── shared/               # 项目通用的自定义组件
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── ...
│   └── ...                   # 其他业务组件
├── lib/                      # 工具函数、辅助函数、配置等
│   ├── auth.ts               # 身份验证相关 (如果需要)
│   ├── constants.ts          # 常量
│   ├── db.ts                 # 数据库连接配置 (Prisma client 初始化)
│   ├── utils.ts              # 通用工具函数
│   ├── trpc/                 # tRPC 客户端和服务器端配置
│   │   ├── client.ts         # tRPC 客户端
│   │   ├── server.ts         # tRPC 服务器端
│   │   └── utils.ts          # tRPC 工具函数
│   └── ...
├── prisma/                   # Prisma 相关文件
│   ├── schema.prisma         # Prisma schema 文件
│   └── migrations/           # 数据库迁移文件
├── stores/                   # Zustand 状态管理
│   ├── useUserStore.ts       # 用户状态
│   ├── useThemeStore.ts      # 主题状态
│   └── ...
├── hooks/                    # 自定义 Hooks
│   ├── useDebounce.ts
│   ├── useIsMounted.ts
│   └── ...
├── types/                    # TypeScript 类型定义
│   ├── index.ts              # 通用类型定义
│   └── ...                   # 其他模块类型定义
├── public/                   # 静态资源
│   ├── favicon.ico
│   └── ...
├── .eslintrc.json            # ESLint 配置文件
├── .prettierrc               # Prettier 配置文件
├── .gitignore                # Git 忽略文件
├── husky.config.js           # Husky 配置文件
├── next-env.d.ts             # Next.js 环境声明文件
├── next.config.js            # Next.js 配置文件
├── package.json              # 项目依赖和脚本
├── pnpm-lock.yaml            # pnpm 锁定文件
├── postcss.config.js         # PostCSS 配置文件 (Tailwind CSS 需要)
├── README.md                 # 项目说明文档
└── tailwind.config.ts        # Tailwind CSS 配置文件
└── tsconfig.json             # TypeScript 配置文件
```

## 技术实现细节

### 数据库设计(可选)

- 使用 Prisma Schema 定义数据模型
- 实现数据库迁移脚本
- 编写基本的 CRUD 操作

### 状态管理

- 使用 Zustand 进行全局状态管理
- 封装常用的状态操作 Hooks

### API 设计

- 使用 tRPC 创建类型安全的 API 路由
- 实现服务端和客户端的端到端类型校验

### 前端组件

- 使用 shadcn/ui 构建响应式 UI 组件
- 表单验证和交互状态管理

## 开发环境配置

### 必要的环境变量

```
DATABASE_URL=
NEXTAUTH_SECRET=
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 开发脚本

- 开发环境启动
- 生产构建
- 代码lint
- 数据库迁移
- 运行测试

## 交付物

1. 完整项目源代码
2. 详细的 README.md
3. 数据库迁移脚本
4. 环境配置说明
5. 基本使用文档

## 编码规范

- 严格遵循 TypeScript 最佳实践
- 代码简洁、可读
- 详细的内联注释

```

## 补充说明
- 优先考虑代码质量和最佳实践
- 保持代码的可扩展性
- 提供清晰的项目架构和目录结构
- 使用 Husky 进行 Git Hooks 管理，确保提交的代码符合规范（如 ESLint、Prettier）
- 使用shadcn/ui中的组件
- 安装项目中所有的依赖项




```
