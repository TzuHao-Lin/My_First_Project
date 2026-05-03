# Career Explorer

這是一個幫助學生探索職業方向的網站。

目標不是直接告訴學生「你一定適合什麼」，而是幫助學生開始理解：

- 自己可能適合哪些工作方式
- 不同職業需要哪些特質
- 哪些職業可能需要更長期的準備
- 現在可以先做哪些小型探索

## 目前階段

目前這個專案還在第一階段，主要功能是：

- 提供不同職業的整理與介紹
- 透過分類與搜尋探索職業
- 顯示每個職業的特質
- 顯示適合 / 不適合分析
- 用簡單問題引導學生開始思考
- 根據回答產生初步推薦結果

目標是：

讓學生不要只靠想像選科系，而是開始理解「適合度」。

## 下一步：更完整的自我探索系統

接下來會把現在的簡單問題系統，升級成更像 MBTI 的結構，但更偏向職涯方向：

- 題目從 6 題增加到 15-25 題
- 加入「權重與分數」，而不是只做單純 matching
- 分析更多面向：
- 喜歡與人互動 vs 獨立工作
- 創意 vs 邏輯
- 壓力承受度
- 穩定 vs 冒險
- 是否能接受長期學習

目標是：

讓推薦更精準，而不是只是初步方向。

## 年齡 / 階段化規劃

未來會根據使用者的年齡或學習階段，提供不同的探索計劃。

同一個職業方向，對不同階段的人來說，下一步會不一樣。

例如：

- 國中生：以認識職業、興趣探索、社團與營隊為主
- 高中生：以選課、專題、志工、競賽與大學方向為主
- 大學生：以實習、研究、作品集、證照與申請準備為主
- 轉職者：以技能盤點、補課、作品集與職涯轉換策略為主

目標是：

讓同一個職業方向，可以根據不同人生階段給出不同下一步。

## 小遊戲 / 小挑戰

未來會加入一些小遊戲或小挑戰，讓學生如果對某個方向有興趣，可以先用輕鬆的方式體驗。

這些小遊戲不是為了測驗分數，而是讓學生感覺：

「我是不是真的喜歡做這類事情？」

可能的例子：

- Technology：做一個小網站、修一個 bug、完成簡單資料分析任務
- Healthcare：判斷簡單病人情境、學習急救流程、認識人體系統
- Design：重新設計一個 App 畫面、做 mood board、改善一個使用者流程
- Business：模擬開一家小店、設計行銷活動、做預算分配
- Law：用不同立場分析一個案例、模擬辯論、找出證據支持論點
- Media：設計短影片腳本、做一篇迷你報導、規劃一個遊戲關卡
- Education：設計一張學習單、把一個難概念教給別人
- Public Service：模擬緊急事件決策、規劃社區服務活動

目標是：

讓學生在真正投入很多時間以前，先用小型體驗確認自己是否喜歡這個方向。

## 不同學制

未來會加入不同地區的學制：

- 台灣
- 美國

因為不同地區的職涯路徑差異很大，例如：

- 醫學院制度不同
- 研究所與本科差異很大
- 執照與職涯路徑不同

目標是：

讓建議更貼近真實世界，而不是通用模板。


## 個人職涯成長平台

未來希望加入像 Notion 一樣的個人紀錄空間，讓使用者可以記錄自己往職涯方向前進的過程。

可能包含：

- 每個使用者有自己的職涯 dashboard
- 記錄已完成的小挑戰
- 記錄參加過的活動、課程、社團、志工、實習
- 記錄每週或每月學到的技能
- 根據不同年齡 / 階段，提供不同紀錄模板
- 讓學生看到自己從「探索」到「累積經驗」的成長軌跡

未來也可以加入週報或月報功能：

- 每週 / 每月寄出進度摘要
- 告訴使用者這段時間完成了什麼
- 鼓勵使用者繼續前進
- 提醒下一個可以做的小步驟
- 幫助使用者整理自己的職涯故事

目標是：

讓 Career Explorer 不只是一次性的測驗，而是一個長期陪伴使用者成長的平台。
## AI Agent 最終目標

最後會加入 AI agent，讓系統不只是推薦職業，而是幫你規劃未來怎麼走。

可能包含：

- 選這個方向後，下一步要做什麼
- 大學應該修哪些課
- 需要學什麼技能
- 研究所可以做哪些主題
- 每個月可以做哪些嘗試

目標是：

從「知道方向」到「真的走出一條路」。

## Scoring Model + Career Matching Algorithm

目前推薦邏輯已經開始整理成比較清楚的分數模型，而不是只有單純比對。

### 1. User profile layer

系統先把使用者的回答轉成一個 profile，主要來源有：

- 年齡 / 階段
- Layer 2A：喜歡面對什麼
- Layer 2B：喜歡做什麼
- Layer 3：如果有嚮往職業，會做少量方向加權
- Layer 4：情境題答案

目前 profile 會映射到幾個核心維度：

- people
- logic
- creativity
- pressure
- stability
- longLearning

### 2. Cluster scoring layer

系統不會一開始就在全部職業裡硬排，而是先算職業群分數。

目前 cluster score 由這些部分組成：

- base match：使用者 profile 和該群高分職業的平均接近度
- category overlap：Layer 2 選項和 cluster categories 的重疊
- tag overlap：Layer 2 選項和 cluster tags 的重疊
- combo boost：特定組合加成
- conflict penalty：高衝突方向扣分
- aspiration boost：如果使用者已經有嚮往方向，會做少量加權

### 3. Career scoring layer

在主要 cluster 確立後，再針對職業本身算分。

career score 目前結構：

- match score：user profile vs career fit profile
- interest category boost
- interest tag boost
- desired-career similarity boost
- cluster bonus

### 4. Why this matters

這個設計的目標不是直接給唯一答案，而是：

- 先找出值得探索的方向
- 再從方向裡挑代表職業
- 讓推薦更像 exploration，而不是 final judgment

## Anonymous User Data Collection

目前已經開始支援匿名資料收集，前端會把匿名事件送到後端 API，資料存在伺服器端 JSON 檔，之後可以匯出分析。

### 目前的後端架構

- `server/server.mjs`：Node.js API server
- `GET /api/health`：確認 server 是否正常
- `GET /api/analytics/summary`：讀取匿名事件摘要
- `GET /api/analytics/export`：匯出全部匿名事件
- `POST /api/analytics/events`：新增匿名事件
- `DELETE /api/analytics/events`：清空匿名事件

開發時：

- 前端：`npm run dev`
- 後端：`npm run server`

Vite 目前已經設定好 `/api` proxy 到 `http://localhost:8787`。

### 目前會收集什麼

- discovery_ready
- discovery_completed
- direction_opened
- discovery_reset

### 目前收集的欄位

- 匿名 user id
- timestamp
- age group
- Layer 2A / 2B selections
- 是否有嚮往職業
- 是否跳過 Layer 4
- top directions
- 使用者深入點進哪條方向

### 目前不收集什麼

- 姓名
- email
- 聯絡方式
- 自由輸入的未匹配個資

### 下一步可以怎麼做

- 匯出 JSON 後分析哪種答案組合最常走向哪些方向
- 比較使用者最後深入看的方向和系統第一名方向是否一致
- 找出常常被誤判的職業群
- 用真實資料校正 cluster boost / conflict penalty / category mapping
