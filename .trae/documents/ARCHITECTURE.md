# 星光衣坊 - 技术架构文档

## 1. 系统架构总览

### 1.1 架构模式
采用 **前后端分离架构** (Frontend-Backend Separation Architecture)，前后端通过 RESTful API 进行通信，使用 WebSocket 实现实时数据同步。

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   移动端 APP    │◄───►│                  │◄───►│   AI 3D API    │
│  (React PWA)   │     │   Node.js API    │     │ (Meshy/Luma)   │
└─────────────────┘     │   + Express     │     └─────────────────┘
                        │                  │
┌─────────────────┐     │  + MongoDB      │     ┌─────────────────┐
│   PC Web       │◄───►│  + Socket.io    │◄───►│   文件存储      │
│  (React SPA)  │     │                  │     │   (本地/OSS)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### 1.2 技术栈详情

#### 前端技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.2+ | UI 框架 |
| Vite | 5.0+ | 构建工具 |
| Three.js | 0.160+ | 3D 渲染引擎 |
| React Three Fiber | 8.0+ | React Three.js 封装 |
| Drei | 9.0+ | Three.js React 工具库 |
| Zustand | 4.4+ | 状态管理 |
| React Router | 6.0+ | 路由管理 |
| Axios | 1.6+ | HTTP 请求 |
| Socket.io Client | 4.7+ | WebSocket 客户端 |

#### 后端技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | 18.0+ | 运行时环境 |
| Express | 4.18+ | Web 框架 |
| MongoDB | 6.0+ | 数据库 |
| Mongoose | 8.0+ | MongoDB ORM |
| Socket.io | 4.7+ | WebSocket 服务 |
| JSON Web Token | 9.0+ | 身份认证 |
| Bcrypt | 5.1+ | 密码加密 |
| Axios | 1.6+ | 外部 API 请求 |
| Multer | 1.5+ | 文件上传 |

## 2. 前端架构

### 2.1 目录结构
```
frontend/
├── src/
│   ├── components/           # 可复用组件
│   │   ├── common/          # 通用组件（Button, Input, Modal）
│   │   ├── design/          # 设计相关组件
│   │   ├── three/           # Three.js 3D 组件
│   │   └── layout/          # 布局组件
│   ├── pages/               # 页面组件
│   │   ├── Home/           # 首页
│   │   ├── Design/         # 设计页面
│   │   ├── Gallery/        # 作品展示
│   │   └── Profile/        # 个人中心
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useVoiceInput.js      # 语音输入
│   │   ├── useThreeScene.js      # Three.js 场景
│   │   └── useAuth.js           # 认证状态
│   ├── stores/              # Zustand 状态库
│   │   ├── authStore.js
│   │   ├── designStore.js
│   │   └── uiStore.js
│   ├── services/            # API 服务层
│   │   ├── api.js          # Axios 实例
│   │   ├── authService.js
│   │   ├── designService.js
│   │   └── aiService.js
│   ├── styles/              # 全局样式
│   │   ├── variables.css   # CSS 变量
│   │   ├── global.css      # 全局样式
│   │   └── animations.css  # 动画定义
│   ├── utils/               # 工具函数
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   ├── models/             # 3D 模型文件
│   └── textures/           # 纹理图片
└── package.json
```

### 2.2 核心组件设计

#### 2.2.1 Three.js 3D 场景组件
```jsx
// 3D 场景结构
SceneContainer
├── LightingSetup           # 灯光配置
│   ├── AmbientLight        # 环境光
│   ├── DirectionalLight    # 主光源
│   └── SpotLight          # 聚光灯（摄影棚效果）
├── CameraController        # 相机控制
├── ModelViewer             # 服装模型
│   ├── GLTFLoader          # 模型加载
│   ├── OrbitControls       # 轨道控制
│   └── MaterialEditor      # 材质调整
├── Environment             # 环境设置
│   ├── Background          # 背景（摄影棚）
│   └── Ground              # 地面
└── Effects                 # 后期效果
    ├── BloomEffect         # 光晕
    └── DepthOfField        # 景深
```

#### 2.2.2 语音输入组件
```jsx
VoiceInput
├── SpeechRecognizer        # Web Speech API 封装
├── AudioVisualizer         # 音频可视化
├── TranscriptDisplay       # 实时文字显示
└── LanguageSelector        # 语言选择
```

### 2.3 状态管理设计

#### 认证状态 (authStore)
```javascript
{
  user: { id, email, nickname, avatar },
  token: string,
  isAuthenticated: boolean,
  isLoading: boolean,
  
  // Actions
  login: (credentials) => Promise,
  logout: () => void,
  register: (userData) => Promise,
  updateProfile: (data) => Promise,
  checkAuth: () => Promise
}
```

#### 设计状态 (designStore)
```javascript
{
  currentDesign: {
    id, title, description, prompt,
    status, modelUrl, thumbnailUrl,
    parameters, createdAt
  },
  designsList: Design[],
  generationProgress: number,
  
  // Actions
  createDesign: (designData) => Promise,
  updateDesign: (id, data) => Promise,
  deleteDesign: (id) => Promise,
  fetchDesigns: () => Promise,
  submitGeneration: (prompt) => Promise,
  checkGenerationStatus: (taskId) => Promise
}
```

## 3. 后端架构

### 3.1 目录结构
```
backend/
├── config/
│   ├── database.js         # MongoDB 配置
│   ├── jwt.js              # JWT 配置
│   └── ai-providers.js     # AI API 配置
├── controllers/
│   ├── authController.js
│   ├── designController.js
│   └── generationController.js
├── middleware/
│   ├── auth.js             # JWT 认证中间件
│   ├── rateLimiter.js     # API 限流
│   ├── errorHandler.js     # 错误处理
│   └── validator.js        # 数据验证
├── models/
│   ├── User.js
│   └── Design.js
├── routes/
│   ├── auth.js
│   ├── designs.js
│   └── generation.js
├── services/
│   ├── aiService.js        # AI API 集成
│   ├── socketService.js    # WebSocket 服务
│   └── storageService.js   # 文件存储服务
├── utils/
│   ├── asyncHandler.js
│   └── logger.js
├── server.js
└── package.json
```

### 3.2 API 端点详细设计

#### 认证接口
| 方法 | 路径 | 描述 | 请求体 | 响应 |
|------|------|------|--------|------|
| POST | /api/auth/register | 用户注册 | {email, password, nickname} | {user, token} |
| POST | /api/auth/login | 用户登录 | {email, password} | {user, token} |
| GET | /api/auth/profile | 获取用户信息 | - | {user} |
| PUT | /api/auth/profile | 更新用户信息 | {nickname, avatar} | {user} |

#### 设计接口
| 方法 | 路径 | 描述 | 请求体 | 响应 |
|------|------|------|--------|------|
| GET | /api/designs | 获取设计列表 | - | {designs[]} |
| POST | /api/designs | 创建新设计 | {title, description, parameters} | {design} |
| GET | /api/designs/:id | 获取设计详情 | - | {design} |
| PUT | /api/designs/:id | 更新设计 | {title, description} | {design} |
| DELETE | /api/designs/:id | 删除设计 | - | {success} |

#### AI 生成接口
| 方法 | 路径 | 描述 | 请求体 | 响应 |
|------|------|------|--------|------|
| POST | /api/generate/3d | 提交生成任务 | {prompt, parameters} | {taskId, status} |
| GET | /api/generate/status/:taskId | 查询任务状态 | - | {status, progress, modelUrl} |
| POST | /api/generate/upload | 上传参考图片 | FormData (file) | {imageUrl} |

### 3.3 AI 3D 生成服务

#### Meshy AI 集成
```javascript
// 服务配置
const meshyConfig = {
  baseURL: 'https://api.meshy.ai/v1',
  apiKey: process.env.MESHY_API_KEY,
  endpoints: {
    textTo3D: '/text-to-3d',
    imageTo3D: '/image-to-3d',
    taskStatus: '/tasks/{taskId}'
  }
}

// 生成流程
async function generate3DModel(prompt, parameters) {
  // 1. 提交生成请求
  const response = await axios.post(
    `${meshyConfig.baseURL}${meshyConfig.endpoints.textTo3D}`,
    {
      prompt: buildPrompt(prompt, parameters),
      style: 'realistic',
      resolution: '1024'
    },
    {
      headers: {
        'Authorization': `Bearer ${meshyConfig.apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  )
  
  // 2. 返回任务 ID
  return { taskId: response.data.result }
}

// 轮询任务状态
async function checkTaskStatus(taskId) {
  const response = await axios.get(
    `${meshyConfig.baseURL}/tasks/${taskId}`,
    {
      headers: {
        'Authorization': `Bearer ${meshyConfig.apiKey}`
      }
    }
  )
  
  return {
    status: response.data.status,
    progress: response.data.progress,
    modelUrl: response.data.model_url,
    thumbnailUrl: response.data.thumbnail_url
  }
}
```

### 3.4 WebSocket 实时同步

#### Socket.io 事件设计
```javascript
// 服务端
io.on('connection', (socket) => {
  // 用户认证
  socket.on('authenticate', (token) => {
    const user = verifyToken(token)
    socket.userId = user.id
    socket.join(`user:${user.id}`)
  })
  
  // 加入设计房间
  socket.on('joinDesign', (designId) => {
    socket.join(`design:${designId}`)
  })
  
  // 发送生成进度
  socket.on('generationUpdate', ({ taskId, progress }) => {
    io.to(`design:${designId}`).emit('progress', { taskId, progress })
  })
})

// 客户端
const socket = io('wss://api.starrystudio.com')

socket.emit('authenticate', token)
socket.emit('joinDesign', designId)

socket.on('progress', ({ taskId, progress }) => {
  updateProgressBar(progress)
})
```

## 4. 数据库设计

### 4.1 MongoDB Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  nickname: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  settings: {
    language: { type: String, default: 'zh-CN' },
    theme: { type: String, default: 'dark' }
  },
  createdAt: Date,
  updatedAt: Date
}

// 索引
db.users.createIndex({ email: 1 }, { unique: true })
```

#### Designs Collection
```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 1000
  },
  prompt: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'generating', 'completed', 'failed'],
    default: 'draft'
  },
  modelUrl: {
    type: String,
    default: null
  },
  thumbnailUrl: {
    type: String,
    default: null
  },
  parameters: {
    style: String,
    colorScheme: [String],
    complexity: String,
    lighting: String
  },
  generationTaskId: String,
  generationProgress: {
    type: Number,
    default: 0
  },
  referenceImages: [String],
  tags: [String],
  isPublic: {
    type: Boolean,
    default: false
  },
  createdAt: Date,
  updatedAt: Date
}

// 索引
db.designs.createIndex({ userId: 1, createdAt: -1 })
db.designs.createIndex({ status: 1 })
```

### 4.2 数据关系
```
User (1) ──────< Design (N)
  │                  │
  │                  ├── modelUrl (3D 模型文件)
  │                  ├── thumbnailUrl (缩略图)
  │                  └── generationTaskId (AI 任务 ID)
```

## 5. 部署架构

### 5.1 开发环境
- **前端**：http://localhost:5173 (Vite Dev Server)
- **后端**：http://localhost:3000
- **MongoDB**：mongodb://localhost:27017/starrystudio

### 5.2 生产环境架构
```
┌─────────────────────────────────────────┐
│              CDN (静态资源)              │
│   assets.starrystudio.com              │
└────────────────┬────────────────────────┘
                 │
        ┌────────▼────────┐
        │   Load Balancer  │
        │   (Nginx)        │
        └────────┬────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼───┐   ┌───▼───┐   ┌───▼───┐
│ Node  │   │ Node  │   │ Node  │
│ App 1 │   │ App 2 │   │ App 3 │
└───┬───┘   └───┬───┘   └───┬───┘
    │            │            │
    └────────────┼────────────┘
                 │
        ┌────────▼────────┐
        │    MongoDB      │
        │    Replica Set  │
        └─────────────────┘
```

### 5.3 环境变量配置

#### 前端 (.env)
```env
VITE_API_BASE_URL=https://api.starrystudio.com
VITE_SOCKET_URL=wss://api.starrystudio.com
VITE_APP_NAME=星光衣坊
```

#### 后端 (.env)
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://mongo:27017/starrystudio
JWT_SECRET=your-super-secret-jwt-key
MESHY_API_KEY=your-meshy-api-key
LUMA_API_KEY=your-luma-api-key
STORAGE_TYPE=local
STORAGE_PATH=/app/uploads
```

## 6. 安全策略

### 6.1 身份认证
- **JWT Token**：有效期 7 天
- **Refresh Token**：有效期 30 天
- **密码加密**：bcrypt，salt rounds = 12

### 6.2 API 安全
- **CORS**：仅允许指定域名
- **Rate Limiting**：每 IP 100 请求/分钟
- **Input Validation**：所有输入使用 Joi/Zod 验证
- **SQL/NoSQL 注入防护**：参数化查询

### 6.3 文件上传安全
- **文件类型验证**：仅允许图片格式
- **文件大小限制**：最大 10MB
- **文件名重命名**：UUID 随机命名
- **存储隔离**：上传文件与代码分离

## 7. 性能优化

### 7.1 前端优化
- **代码分割**：路由级别懒加载
- **3D 模型优化**：
  - GLTF/GLB 压缩格式
  - LOD (Level of Detail) 多级细节
  - 模型文件 < 10MB
- **图片优化**：
  - WebP 格式
  - 懒加载
  - 响应式图片 srcset
- **缓存策略**：
  - Service Worker 离线缓存
  - HTTP 缓存头

### 7.2 后端优化
- **数据库优化**：
  - 索引优化
  - 查询分页
  - 聚合管道
- **缓存层**：
  - Redis 缓存热门数据
  - Session 存储
- **CDN**：静态资源全球分发

## 8. 监控与日志

### 8.1 日志系统
- **日志级别**：error, warn, info, debug
- **日志格式**：JSON 格式，便于分析
- **存储位置**：文件 + ELK Stack

### 8.2 性能监控
- **前端监控**：Web Vitals (LCP, FID, CLS)
- **后端监控**：Node.js 性能指标
- **错误追踪**：Sentry

## 9. 测试策略

### 9.1 单元测试
- **前端**：Jest + React Testing Library
- **后端**：Jest + Supertest

### 9.2 集成测试
- **API 测试**：验证所有端点
- **数据库测试**：MongoDB Memory Server

### 9.3 E2E 测试
- **工具**：Playwright
- **场景**：用户注册 → 创建设计 → 生成模型

## 10. 开发规范

### 10.1 Git 规范
- **分支命名**：feature/, bugfix/, hotfix/
- **提交规范**：feat: 新功能, fix: 修复, docs: 文档
- **PR 要求**：至少 1 人 review

### 10.2 代码规范
- **ESLint + Prettier**：统一代码风格
- **TypeScript**（可选）：类型安全
- **组件规范**：Functional Components + Hooks

### 10.3 命名规范
- **组件**：PascalCase (UserProfile.jsx)
- **变量/函数**：camelCase (getUserData)
- **常量**：UPPER_SNAKE_CASE (API_BASE_URL)
- **文件**：kebab-case (user-profile.jsx)
