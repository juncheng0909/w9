# GitHub Pages 部署步驟

本機專案已完成，不代表已上傳或公開。以下需要你登入自己的 GitHub 帳號。

## 1. 建立 GitHub Repository

1. 本次指定 repository 是 [juncheng0909/w9](https://github.com/juncheng0909/w9)，不需另外建立。
2. 將本專案的完整內容上傳到 repository 根目錄；根目錄應直接看見 `AGENTS.md`、`package.json`、`dist/`，不要多包一層 `cs-learning-hub/`。
3. 建議用 GitHub Desktop：將此資料夾加入或建立為本機 repository，提交全部專案檔案後 Publish repository。若已有遠端 repository，可先 clone 再把本專案內容複製進去。
4. 網頁 Upload files 也可使用，但務必確認隱藏目錄 `.github/workflows/` 是否一起上傳，尤其 `.github/workflows/pages.yml`。不要上傳 ZIP 作為網站內容。

## 2. 啟用自動部署（建議）

專案已經包含 `.github/workflows/pages.yml`，不需要再移動檔案。此工作流程會在推送 `main` 後自動嘗試部署；首次推送若 Pages 尚未啟用而顯示失敗，完成下一步設定後重新執行即可。

1. 在 repository 的 Settings → Pages → Build and deployment → Source 選 **GitHub Actions**。
2. 到 Actions 選 **Deploy GitHub Pages** → Run workflow，或再次 push main；若首次推送早於 Pages 設定，請在完成設定後重新執行。
3. 工作流程會先 build 和 test，通過才將 `dist/` 上傳為 Pages artifact，再部署到 github-pages 環境。
4. 等待綠色成功狀態，在 Settings → Pages 或工作流程 deployment 取得真正網址。本次指定網址為 `https://juncheng0909.github.io/w9/`，以 GitHub 顯示的部署狀態為準。
5. 若預設分支不是 main，修改 `pages.yml` 的 branches，並確認部署環境允許該分支。

## 3. 發布後驗收

- 在無痕視窗開啟正式網址，確認不需登入即可閱讀。
- 點開三篇文章，再回首頁；確認 CSS、圖示與搜尋正常。
- 搜尋 `LIFO`、`BST`、`反證法`；切換分類；搜尋不存在詞並清除條件。
- 手機確認無整頁橫向捲動，程式碼區塊則可單獨捲動。
- 確認 GitHub 能看見 `AGENTS.md`、範本與 README，將 repository 連結、網站連結、AGENTS.md 連結填入繳交範本。

## 後續更新

修改來源 → `npm run check` → 提交來源與 dist → push main。自動部署會重新產生網頁，不必逐篇手動上傳。

## 常見問題

- **404：** 確認部署成功，網址包含 repository 名稱，首頁在 artifact 根目錄。不要把 dist 父資料夾當成首頁。
- **樣式或搜尋失效：** 確認 assets 完整上傳，並用 HTTPS 正式網址；file:// 不支援本專案的模組搜尋。
- **工作流程未出現：** 確認檔案是 `.github/workflows/pages.yml`，不是只存在 docs 裡。
- **Pages 權限或環境錯誤：** 確認 Settings → Pages 已選 GitHub Actions，repository Actions 未被停用，且分支符合環境部署規則。

GitHub 官方說明（2026-11-11 查閱）：[設定 GitHub Pages 發布來源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。
