export const storyNodes = {
  prologue_1: {
    id: 'prologue_1',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '坍塌三年后。',
    character: null,
    next: 'prologue_2',
    duration: 2500,
    chapter: null
  },
  prologue_2: {
    id: 'prologue_2',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '那场名为"坍塌"的超级太阳风暴，摧毁了全球97%的电子设备。',
    character: null,
    next: 'prologue_3',
    duration: 3500
  },
  prologue_3: {
    id: 'prologue_3',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '文明在一夜之间倒退了一百年。电网瘫痪，通讯断绝，秩序崩塌。',
    character: null,
    next: 'prologue_4',
    duration: 3500
  },
  prologue_4: {
    id: 'prologue_4',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '在废墟之上，伊甸科技公司建立了新的秩序——地球Online。',
    character: null,
    next: 'prologue_5',
    duration: 3500
  },
  prologue_5: {
    id: 'prologue_5',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '每个人都必须佩戴生命手环。完成高危任务，赚取生存点。',
    character: null,
    next: 'prologue_6',
    duration: 3500
  },
  prologue_6: {
    id: 'prologue_6',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '生存点可以兑换食物、药品、安全住所。',
    character: null,
    next: 'prologue_7',
    duration: 3000
  },
  prologue_7: {
    id: 'prologue_7',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '生存点低于0.01，手环将释放致命毒素。',
    character: null,
    next: 'prologue_8',
    duration: 4000
  },
  prologue_8: {
    id: 'prologue_8',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '你的手环初始生存点：120.00。',
    character: '系统',
    next: 'prologue_9',
    duration: 3000
  },
  prologue_9: {
    id: 'prologue_9',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '欢迎来到地球Online。祝你...活下去。',
    character: '系统',
    next: 'chapter1_title',
    duration: 3500
  },

  chapter1_title: {
    id: 'chapter1_title',
    type: 'chapter',
    background: 'ruins-street',
    area: '第七区',
    chapterLabel: '第一章',
    chapterText: '废墟街道',
    next: 'scene_1_1',
    duration: 2500
  },

  scene_1_1: {
    id: 'scene_1_1',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '你行走在布满碎石的街道上，远处是倒塌的摩天大楼轮廓。沙尘在风中打着旋。',
    character: null,
    next: 'scene_1_2',
    duration: 4000
  },
  scene_1_2: {
    id: 'scene_1_2',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '今天是你离开避难所的第一天。你需要找到任务公告板，接一份能活下去的工作。',
    character: null,
    next: 'choice_old_man',
    duration: 3500
  },

  choice_old_man: {
    id: 'choice_old_man',
    type: 'choice',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '一个衣衫褴褛的老人从废墟后颤巍巍地走出来，挡住了你的去路。他伸出枯瘦的手，嘴唇干裂。',
    character: null,
    choices: [
      {
        id: 'a',
        text: '给他一份压缩饼干',
        cost: -20,
        next: 'help_old_man',
        consequence: '善举'
      },
      {
        id: 'b',
        text: '侧身绕过，继续赶路',
        cost: 0,
        next: 'ignore_old_man',
        consequence: '冷漠'
      }
    ],
    timeout: 0
  },

  help_old_man: {
    id: 'help_old_man',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '你从背包里掏出一块压缩饼干，递了过去。老人浑浊的眼睛里闪过一丝光亮。',
    character: null,
    next: 'help_old_man_2',
    duration: 3500
  },
  help_old_man_2: {
    id: 'help_old_man_2',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '"年轻人...谢谢你。"老人一边狼吞虎咽，一边含糊地说，"我在这附近待了很久...有些事你应该知道。"',
    character: '老人',
    next: 'help_old_man_3',
    duration: 4000
  },
  help_old_man_3: {
    id: 'help_old_man_3',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '"公告板上的电网维修任务...别去。上个月已经死了三个人。伊甸那帮人，根本不在乎我们的死活。"',
    character: '老人',
    next: 'help_old_man_4',
    duration: 4500
  },
  help_old_man_4: {
    id: 'help_old_man_4',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '你记下了这条情报。老人蹒跚着走回了废墟深处。你注意到他的手环上，生存点显示着：12.37。',
    character: null,
    next: 'scene_task_board',
    duration: 4000
  },

  ignore_old_man: {
    id: 'ignore_old_man',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '你侧过身，从老人身边绕了过去。他没有追上来，只是在你身后发出一声低沉的叹息。',
    character: null,
    next: 'ignore_old_man_2',
    duration: 3500
  },
  ignore_old_man_2: {
    id: 'ignore_old_man_2',
    type: 'narrative',
    background: 'ruins-street',
    area: '第七区 · 外环废墟',
    text: '你告诉自己，在这个世界，每个人都只能靠自己。你加快了脚步，向着任务公告板的方向走去。',
    character: null,
    next: 'scene_task_board',
    duration: 4000
  },

  scene_task_board: {
    id: 'scene_task_board',
    type: 'chapter',
    background: 'task-board',
    area: '第七区 · 任务中心',
    chapterLabel: '第二章',
    chapterText: '抉择',
    next: 'scene_task_board_2',
    duration: 2500
  },

  scene_task_board_2: {
    id: 'scene_task_board_2',
    type: 'narrative',
    background: 'task-board',
    area: '第七区 · 任务中心',
    text: '你来到了第七区的任务公告板。锈迹斑斑的金属板上，用荧光涂料写着各种任务和报酬。',
    character: null,
    next: 'scene_task_board_3',
    duration: 4000
  },
  scene_task_board_3: {
    id: 'scene_task_board_3',
    type: 'narrative',
    background: 'task-board',
    area: '第七区 · 任务中心',
    text: '周围聚集着不少和你一样的幸存者，有人在低声咒骂任务太危险，有人已经接了任务匆匆离开。',
    character: null,
    next: 'choice_task',
    duration: 3500
  },

  choice_task: {
    id: 'choice_task',
    type: 'choice',
    background: 'task-board',
    area: '第七区 · 任务中心',
    text: '公告板上有几个任务还没有被接走。你需要选择一个。',
    character: null,
    choices: [
      {
        id: 'a',
        text: '物资搜索：在废弃超市搜寻食物（低危）',
        cost: 0,
        reward: 30,
        next: 'task_supply',
        consequence: '谨慎'
      },
      {
        id: 'b',
        text: '电网维修：修复第三区的高压线（高危）',
        cost: 0,
        reward: 150,
        next: 'task_grid',
        consequence: '冒险'
      },
      {
        id: 'c',
        text: '黑市送信：把包裹送到地下交易区（未知）',
        cost: 0,
        reward: 80,
        next: 'task_blackmarket',
        consequence: '神秘'
      }
    ],
    timeout: 0
  },

  task_supply: {
    id: 'task_supply',
    type: 'narrative',
    background: 'ruins-street',
    area: '废弃超市',
    text: '你选择了物资搜索任务。废弃超市在两个街区外，虽然路途稍远，但相对安全。',
    character: null,
    next: 'task_supply_2',
    duration: 3500
  },
  task_supply_2: {
    id: 'task_supply_2',
    type: 'narrative',
    background: 'ruins-street',
    area: '废弃超市',
    text: '你在倒塌的货架间翻找了两个小时，最终找到了一些罐头和瓶装水。任务完成。',
    character: null,
    next: 'reward_supply',
    duration: 3500
  },
  reward_supply: {
    id: 'reward_supply',
    type: 'reward',
    background: 'task-board',
    area: '第七区 · 任务中心',
    text: '任务完成：物资搜索',
    rewardAmount: 30,
    next: 'after_task_supply',
    duration: 2500
  },
  after_task_supply: {
    id: 'after_task_supply',
    type: 'narrative',
    background: 'task-board',
    area: '第七区 · 任务中心',
    text: '生存点到账了。虽然不多，但至少能让你再撑几天。你决定去黑市看看，或许能买到些有用的东西。',
    character: null,
    next: 'scene_blackmarket',
    duration: 4000
  },

  task_grid: {
    id: 'task_grid',
    type: 'narrative',
    background: 'ruins-street',
    area: '第三区 · 高压电网',
    text: '你选择了电网维修任务。150点生存点足以让你安逸地活上一个月。但老人的警告在你脑海中回响。',
    character: null,
    next: 'task_grid_2',
    duration: 4000
  },
  task_grid_2: {
    id: 'task_grid_2',
    type: 'narrative',
    background: 'ruins-street',
    area: '第三区 · 高压电网',
    text: '你来到第三区，找到了断裂的高压线。电线垂落在地上，发出危险的嗡鸣声。',
    character: null,
    next: 'choice_grid',
    duration: 3500
  },
  choice_grid: {
    id: 'choice_grid',
    type: 'choice',
    background: 'ruins-street',
    area: '第三区 · 高压电网',
    text: '要修复这段线路，你需要徒手接起高压电线。没有绝缘装备，这无异于赌博。',
    character: null,
    choices: [
      {
        id: 'a',
        text: '小心尝试，慢慢接线',
        cost: 0,
        next: 'grid_success',
        consequence: '幸运'
      },
      {
        id: 'b',
        text: '放弃任务，返回公告板',
        cost: -10,
        next: 'grid_abandon',
        consequence: '退缩'
      }
    ],
    timeout: 0
  },
  grid_success: {
    id: 'grid_success',
    type: 'narrative',
    background: 'ruins-street',
    area: '第三区 · 高压电网',
    text: '你深吸一口气，用衣服裹住双手，小心翼翼地接起了电线。火花四溅，但你没有被击中。',
    character: null,
    next: 'grid_success_2',
    duration: 4000
  },
  grid_success_2: {
    id: 'grid_success_2',
    type: 'narrative',
    background: 'ruins-street',
    area: '第三区 · 高压电网',
    text: '电网重新亮起了微弱的光芒。手环传来提示：任务完成。你瘫坐在地上，大口喘着气。',
    character: null,
    next: 'reward_grid',
    duration: 3500
  },
  reward_grid: {
    id: 'reward_grid',
    type: 'reward',
    background: 'task-board',
    area: '第七区 · 任务中心',
    text: '任务完成：电网维修',
    rewardAmount: 150,
    next: 'after_task_grid',
    duration: 2500
  },
  after_task_grid: {
    id: 'after_task_grid',
    type: 'narrative',
    background: 'task-board',
    area: '第七区 · 任务中心',
    text: '你获得了丰厚的报酬。有了这些生存点，你可以在黑市上买点好东西了。',
    character: null,
    next: 'scene_blackmarket',
    duration: 3500
  },
  grid_abandon: {
    id: 'grid_abandon',
    type: 'narrative',
    background: 'ruins-street',
    area: '第三区 · 高压电网',
    text: '你最终还是退缩了。看着那些滋滋作响的高压线，你觉得命比生存点重要。',
    character: null,
    next: 'grid_abandon_2',
    duration: 3500
  },
  grid_abandon_2: {
    id: 'grid_abandon_2',
    type: 'narrative',
    background: 'task-board',
    area: '第七区 · 任务中心',
    text: '放弃任务扣除了10点违约金。你觉得有些沮丧，但至少还活着。你决定去黑市碰碰运气。',
    character: null,
    next: 'scene_blackmarket',
    duration: 4000
  },

  task_blackmarket: {
    id: 'task_blackmarket',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '你选择了黑市送信任务。一个戴着兜帽的人把一个密封的包裹交给了你，让你送到地下交易区的指定地点。',
    character: null,
    next: 'task_blackmarket_2',
    duration: 4000
  },
  task_blackmarket_2: {
    id: 'task_blackmarket_2',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '地下交易区比你想象的更加热闹。各种违禁品在摊位上交易，空气中弥漫着烟雾和可疑的气味。',
    character: null,
    next: 'reward_blackmarket',
    duration: 3500
  },
  reward_blackmarket: {
    id: 'reward_blackmarket',
    type: 'reward',
    background: 'black-market',
    area: '地下交易区',
    text: '任务完成：黑市送信',
    rewardAmount: 80,
    next: 'after_task_blackmarket',
    duration: 2500
  },
  after_task_blackmarket: {
    id: 'after_task_blackmarket',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '你顺利完成了任务。既然已经在黑市了，不如看看有什么值得买的。',
    character: null,
    next: 'scene_blackmarket',
    duration: 3500
  },

  scene_blackmarket: {
    id: 'scene_blackmarket',
    type: 'chapter',
    background: 'black-market',
    area: '地下交易区',
    chapterLabel: '第三章',
    chapterText: '黑市',
    next: 'scene_blackmarket_2',
    duration: 2500
  },
  scene_blackmarket_2: {
    id: 'scene_blackmarket_2',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '黑市的商品琳琅满目，从基本的食物药品到伊甸公司的内部情报，应有尽有。当然，价格也不菲。',
    character: null,
    next: 'choice_blackmarket',
    duration: 4000
  },

  choice_blackmarket: {
    id: 'choice_blackmarket',
    type: 'choice',
    background: 'black-market',
    area: '地下交易区',
    text: '你在一个摊位前停下。摊主是个独眼的中年男人，他面前摆着几样东西。',
    character: null,
    choices: [
      {
        id: 'a',
        text: '购买急救包（-40生存点）',
        cost: -40,
        next: 'buy_medkit',
        consequence: '谨慎'
      },
      {
        id: 'b',
        text: '购买伊甸内部情报（-60生存点）',
        cost: -60,
        next: 'buy_intel',
        consequence: '求知'
      },
      {
        id: 'c',
        text: '什么都不买，攒着生存点',
        cost: 0,
        next: 'save_points',
        consequence: '节俭'
      }
    ],
    timeout: 0
  },

  buy_medkit: {
    id: 'buy_medkit',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '你买了一个急救包。摊主一边数着你的生存点转账，一边嘟囔着"明智的选择，在这个世界，受伤就是死。"',
    character: null,
    next: 'buy_medkit_2',
    duration: 4000
  },
  buy_medkit_2: {
    id: 'buy_medkit_2',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '你把急救包塞进背包，心里踏实了一些。这时，你听到旁边有人在谈论伊甸大厦的事。',
    character: null,
    next: 'eden_tower_setup',
    duration: 3500
  },

  buy_intel: {
    id: 'buy_intel',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '你花60点买下了情报。摊主凑近你，压低声音说："第十层，有反抗军的人。他们在找知道真相的人。"',
    character: '摊主',
    next: 'buy_intel_2',
    duration: 4000
  },
  buy_intel_2: {
    id: 'buy_intel_2',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '真相？关于什么的真相？你还想追问，但摊主已经摆摆手去招呼下一个客人了。',
    character: null,
    next: 'eden_tower_setup',
    duration: 3500
  },

  save_points: {
    id: 'save_points',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '你决定什么都不买。生存点就是生命，能多攒一点是一点。',
    character: null,
    next: 'save_points_2',
    duration: 3500
  },
  save_points_2: {
    id: 'save_points_2',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '你在黑市中漫无目的地走着，忽然听到前方有人在高声谈论着什么"伊甸大厦"、"第十层"。',
    character: null,
    next: 'eden_tower_setup',
    duration: 3500
  },

  eden_tower_setup: {
    id: 'eden_tower_setup',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '伊甸大厦——陆寒声的总部，也是地球Online系统的核心。据说，那里有终极奖励的真相。',
    character: null,
    next: 'eden_tower_setup_2',
    duration: 4000
  },
  eden_tower_setup_2: {
    id: 'eden_tower_setup_2',
    type: 'narrative',
    background: 'black-market',
    area: '地下交易区',
    text: '1000万生存点，兑换往生者完整的"记忆经验包"——另一种形式的永生。你一直觉得这只是个传说。',
    character: null,
    next: 'chapter_final_title',
    duration: 4500
  },

  chapter_final_title: {
    id: 'chapter_final_title',
    type: 'chapter',
    background: 'eden-tower',
    area: '伊甸大厦',
    chapterLabel: '终章',
    chapterText: '真相',
    next: 'eden_tower_1',
    duration: 2500
  },

  eden_tower_1: {
    id: 'eden_tower_1',
    type: 'narrative',
    background: 'eden-tower',
    area: '伊甸大厦 · 一层大厅',
    text: '不知为何，你鬼使神差地来到了伊甸大厦。巨大的玻璃穹顶下，光洁的地板反射着冰冷的白光。',
    character: null,
    next: 'eden_tower_2',
    duration: 4000
  },
  eden_tower_2: {
    id: 'eden_tower_2',
    type: 'narrative',
    background: 'eden-tower',
    area: '伊甸大厦 · 一层大厅',
    text: '你本以为会被守卫拦住，但门口的保安只是看了一眼你的手环，就面无表情地点了点头。',
    character: null,
    next: 'eden_tower_3',
    duration: 4000
  },
  eden_tower_3: {
    id: 'eden_tower_3',
    type: 'narrative',
    background: 'eden-tower',
    area: '伊甸大厦 · 电梯',
    text: '你走进电梯。面板上，只有一个按钮亮着红光：顶层。',
    character: null,
    next: 'eden_tower_4',
    duration: 3500
  },
  eden_tower_4: {
    id: 'eden_tower_4',
    type: 'narrative',
    background: 'eden-tower',
    area: '伊甸大厦 · 顶层',
    text: '电梯飞速上升。叮——门开了。你看到一个男人站在落地窗前，背对着你。',
    character: null,
    next: 'eden_tower_5',
    duration: 4000
  },
  eden_tower_5: {
    id: 'eden_tower_5',
    type: 'narrative',
    background: 'eden-tower',
    area: '伊甸大厦 · 顶层办公室',
    text: '"你来了。"他转过身。英俊的脸上带着一丝疲惫，但眼神锐利如刀——陆寒声，伊甸科技的总裁。',
    character: null,
    next: 'choice_final',
    duration: 4000
  },

  choice_final: {
    id: 'choice_final',
    type: 'choice',
    background: 'eden-tower',
    area: '伊甸大厦 · 顶层办公室',
    text: '"我知道你在想什么。"陆寒声缓缓走近，"关于终极奖励，关于系统的真相。你现在有机会知道答案。"',
    character: '陆寒声',
    choices: [
      {
        id: 'a',
        text: '"告诉我真相。"',
        cost: 0,
        next: 'ending_awake',
        consequence: '觉醒'
      },
      {
        id: 'b',
        text: '"我想兑换终极奖励。"',
        cost: 0,
        next: 'ending_obey',
        consequence: '顺从'
      },
      {
        id: 'c',
        text: '转身离开',
        cost: 0,
        next: 'ending_escape',
        consequence: '逃离'
      }
    ],
    timeout: 0
  },

  ending_awake: {
    id: 'ending_awake',
    type: 'ending',
    endingType: 'good',
    background: 'eden-tower',
    title: '结局A：觉醒者',
    text: '陆寒声沉默了许久。"你是第一个敢直接问的人。"他走到一面墙壁前，按了一下。整面墙变成了屏幕。\n\n屏幕上，是无数的人类大脑，浸泡在营养液中，连接着密密麻麻的线路。\n\n"坍塌从来就不是意外。"他的声音平静得可怕，"地球Online，是一场筛选。1000万点不是奖励，是门票——通往真正新世界的门票。"\n\n"但你不需要了。你已经通过了另一种测试。跟我来吧，反抗军需要你这样的人。"\n\n你站在原地，久久不能平静。原来你所知道的一切，都只是冰山一角。',
    statsLabel: '觉醒'
  },

  ending_obey: {
    id: 'ending_obey',
    type: 'ending',
    endingType: 'neutral',
    background: 'eden-tower',
    title: '结局B：顺从者',
    text: "陆寒声看着你，嘴角露出一抹意味深长的微笑。\n\n\"1000万生存点？你还差得远呢。不过...\"他打了个响指，一台机器从地板下升了上来。\n\n\"有更快的方法。只要你愿意放弃现在的身体，意识上传——你就能获得'永生'。当然，代价是，你将不再是'你'。\"\n\n你看着那台机器，犹豫着。在这个世界，活着已经如此艰难。如果能以另一种形式存在，也许...未必是坏事？\n\n你向前迈出了一步。",
    statsLabel: '顺从'
  },

  ending_escape: {
    id: 'ending_escape',
    type: 'ending',
    endingType: 'neutral',
    background: 'ruins-street',
    title: '结局C：逃亡者',
    text: '你转身就走。陆寒声没有拦你，只是在你身后说："你会回来的。每个人最终都会回来。"\n\n你跑出伊甸大厦，不敢回头。你知道，从今天起，你将成为系统的目标。\n\n但至少，你是自由的。\n\n你向着城市外围走去，那里有未被监控的荒野。手环还戴在手上，但你已经在想办法把它取下来了。\n\n未来未知，但你选择了自己的路。',
    statsLabel: '逃离'
  },

  ending_zero: {
    id: 'ending_zero',
    type: 'ending',
    endingType: 'death',
    background: 'ruins-street',
    title: '结局D：归零者',
    text: '生存点：0.00\n\n手环发出尖锐的警报声。你感到手腕一阵灼烧般的疼痛，随即蔓延到全身。\n\n你倒在地上，视野逐渐模糊。最后看到的，是灰蒙蒙的天空。\n\n这就是地球Online的规则——赢，或者死。\n\n很遗憾，你输了。',
    statsLabel: '归零'
  }
}

export const startingNode = 'prologue_1'
export const initialPoints = 120.00
