# 定制服装设计应用 - 产品需求文档

## 1. 项目概述

### 项目名称
**StarryStudio 星光衣坊** - AI 3D 服装设计平台

### 核心价值
通过自然语言描述，将用户的时尚灵感转化为精致的3D服装设计稿，结合艺术摄影风格的视觉呈现，让每个用户都能成为自己的时尚设计师。

### 目标用户
- 时尚爱好者
- 独立设计师
- 游戏角色服装设计者（闪耀暖暖类游戏）
- 普通消费者（想定制个性化服装）

## 2. 功能需求

### 2.1 核心功能

#### 2.1.1 语音/文字输入设计灵感
- **语音识别输入**：支持实时语音转文字，识别用户的设计描述
- **文字补充输入**：提供文本框允许用户精确描述设计想法
- **灵感模板库**：提供预设的灵感模板（华丽礼服、日常穿搭、奇幻风格等）
- **设计参数调整**：颜色偏好、风格强度、细节复杂度等

#### 2.1.2 AI 3D 设计稿生成
- **调用 AI 3D API**：集成 Meshy 或 Luma AI 的 Text-to-3D 接口
- **生成进度展示**：实时显示生成进度和阶段
- **多角度预览**：支持 360° 旋转查看生成的服装模型
- **设计方案变体**：一键生成多个设计方案供选择

#### 2.1.3 3D 模型展示
- **Three.js 实时渲染**：高性能 WebGL 渲染
- **交互控制**：缩放、旋转、平移
- **材质细节**：支持查看布料纹理、光泽度
- **AR 预览**（可选）：移动端支持 AR 查看

#### 2.1.4 艺术摄影风模板
- **预设摄影棚场景**：柔和灯光、专业布景
- **多风格背景**：简约白棚、杂志封面、户外场景
- **滤镜效果**：光晕、柔焦、色彩分级
- **最终渲染输出**：高清图片导出

#### 2.1.5 跨端数据同步
- **用户账户系统**：邮箱/手机注册登录
- **设计草稿保存**：自动保存所有设计过程
- **历史记录访问**：查看过往所有设计方案
- **实时同步**：WebSocket 保持多设备数据一致

### 2.2 用户界面

#### 2.2.1 移动端界面
- **单手操作优化**：核心功能可单手完成
- **大触摸目标**：按钮间距 ≥ 44px
- **语音输入优先**：显著位置的语音按钮
- **竖屏适配**：默认竖屏布局

#### 2.2.2 PC端界面
- **宽屏展示**：3D 模型大屏预览
- **键盘快捷键**：快速操作
- **鼠标精准控制**：3D 模型交互
- **多窗口支持**：可同时打开多个设计方案

## 3. 技术架构

### 3.1 前端技术栈
- **框架**：React 18+
- **3D 渲染**：Three.js + React Three Fiber
- **状态管理**：Zustand（轻量级）
- **样式方案**：CSS Modules + CSS Variables
- **语音识别**：Web Speech API
- **构建工具**：Vite

### 3.2 后端技术栈
- **运行时**：Node.js 18+
- **框架**：Express.js
- **数据库**：MongoDB（存储用户、设计数据）
- **实时通信**：Socket.io（数据同步）
- **AI API 集成**：Meshy AI / Luma AI
- **文件存储**：本地存储或 OSS

### 3.3 API 设计

#### 用户接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/profile` - 获取用户信息

#### 设计接口
- `POST /api/designs` - 创建新设计
- `GET /api/designs` - 获取用户所有设计
- `GET /api/designs/:id` - 获取单个设计详情
- `PUT /api/designs/:id` - 更新设计
- `DELETE /api/designs/:id` - 删除设计

#### AI 生成接口
- `POST /api/generate/3d` - 提交 3D 生成任务
- `GET /api/generate/status/:taskId` - 查询生成状态

### 3.4 数据模型

#### User（用户）
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hash),
  nickname: String,
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Design（设计）
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  description: String,        // 用户输入的设计描述
  prompt: String,             // 发送给 AI 的完整 prompt
  status: String,             // pending, generating, completed, failed
  modelUrl: String,           // 3D 模型 URL
  thumbnailUrl: String,        // 缩略图 URL
  parameters: {
    style: String,
    colorScheme: [String],
    complexity: String
  },
  taskId: String,             // AI 任务 ID
  createdAt: Date,
  updatedAt: Date
}
```

## 4. 设计风格

### 4.1 艺术摄影风视觉
- **主色调**：深邃星空蓝 + 玫瑰金点缀
- **渐变背景**：紫色到深蓝的梦幻渐变
- **光效元素**：星光粒子、柔和光晕
- **阴影运用**：柔和阴影营造层次感
- **边框设计**：细线金边，低调奢华

### 4.2 字体选择
- **标题字体**：Noto Serif SC（优雅衬线体）
- **正文字体**：Source Sans Pro（清晰无衬线）
- **装饰字体**：Cinzel（高端感）

### 4.3 动效设计
- **页面转场**：淡入淡出 + 微妙的缩放
- **按钮交互**：悬停时柔和发光
- **加载动画**：旋转的星光图标
- **成功反馈**：粒子绽放效果

### 4.4 响应式断点
- **移动端**：< 768px
- **平板**：768px - 1024px
- **桌面**：> 1024px

## 5. 非功能需求

### 5.1 性能要求
- **首屏加载**：< 3 秒
- **3D 模型加载**：< 5 秒（10MB 以内）
- **语音识别延迟**：< 500ms
- **AI 生成时间**：显示进度条，预计 30-60 秒

### 5.2 兼容性
- **浏览器**：Chrome, Safari, Firefox, Edge 最新版
- **移动端**：iOS 14+, Android 10+
- **PC**：Windows 10+, macOS 10.15+

### 5.3 安全性
- **密码加密**：bcrypt 加密存储
- **JWT 认证**：短期访问令牌
- **API 限流**：防止滥用
- **输入验证**：防止 XSS/SQL 注入

## 6. 项目结构

```
/workspace/
├── frontend/                 # React 前端
│   ├── public/
│   ├── src/
│   │   ├── components/       # React 组件
│   │   ├── pages/            # 页面组件
│   │   ├── hooks/            # 自定义 hooks
│   │   ├── stores/           # Zustand 状态
│   │   ├── services/         # API 服务
│   │   ├── styles/           # 全局样式
│   │   ├── utils/            # 工具函数
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js 后端
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── package.json
└── documents/                # 文档
    ├── PRD.md
    └── ARCHITECTURE.md
```

## 7. 开发计划

### 第一阶段：基础框架
1. 项目初始化（前端 + 后端）
2. 用户认证系统
3. 基础 UI 组件

### 第二阶段：核心功能
1. 语音输入功能
2. AI 3D 生成集成
3. Three.js 3D 展示

### 第三阶段：完善体验
1. 艺术摄影风模板
2. 数据同步系统
3. 响应式优化

### 第四阶段：测试上线
1. 全面测试
2. 性能优化
3. 部署上线
