# Douyin Data Export Userscript

A Tampermonkey userscript that exports one month of video performance data from the Douyin Creator Centre (the Chinese version of TikTok) into a CSV file and a visual HTML report.

## Why I built it

In 2023 I worked as a journalist and digital content editor at a provincial broadcaster in China. My team published dozens of short videos a day on a shared Douyin account, and every month we had to record which videos had passed performance thresholds.

The Creator Centre could not export this data, so we scrolled through the video list by hand and copied each video's numbers into a spreadsheet. The job took hours each month and mistakes were easy to make.

I had no IT background. I taught myself JavaScript, asked a programmer friend for advice when I got stuck, and wrote this script. The monthly task dropped to about 10-20 minutes per person, and colleagues and managers began using it for their own reporting. When my team and colleagues from other teams said they needed data for other periods, I added a month picker so they could export any month, and wrote a version that exported a whole year.

## What it does

1. Adds a month picker and a **Start!** button to the Creator Centre video list page.
2. Scrolls the page automatically every three seconds, so Douyin keeps loading older videos, and stops once it reaches videos from before the selected month.
3. Reads each video card on the page: cover image, publish date, title, likes and views.
4. Keeps only the videos published in the selected month and sorts them by likes, highest first. Values such as `1.2w` (1.2 万) are converted to numbers.
5. Downloads two files:
   * `<month>抖音数据.csv`: date, title, likes and views, ready for Excel.
   * `<month>抖音数据.html`: a table with cover thumbnails, which can be printed or saved as PDF for reports.
  
## Versions and branches
- `main` (this branch): pick any month and export that month's videos.
- Whole-year export: the first upload (`b938312`, April 2023) contains a second copy of the script that exports every video from a chosen year. It was removed from `main` in June 2023 when CSV export was added.
- `multiple-months`: an extension I started in June 2023 to export several months in one run. It is unfinished: the start date is still hard-coded, so it does not use the month picker yet.

## How to use it

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension.
2. Create a new userscript and paste in `Data-From-Douyin.js`.
3. Sign in to the Douyin Creator Centre with an account you are allowed to manage, then open the video list page (`https://creator.douyin.com/creator-micro/...`).
4. Choose a month and click **Start!**. Leave the tab open until both files download.

The script only reads data that the signed-in account can already see. It cannot access other people's accounts.

## How it was made

* Plain JavaScript in a Tampermonkey userscript, with no build step.
* The data comes from the page's DOM. I inspected the Creator Centre page to find the elements for each video card.
* Files are generated in the browser and downloaded through data URLs, so nothing leaves the user's computer.
* Written in 2023 without AI coding tools.

## Limitations

* The script depends on Douyin's CSS class names as they were in 2023. Douyin has changed its interface since then, so the script will probably need updated selectors before it works again.
* Comments and shares are not exported.

## 中文说明

这是一个 JS 脚本，能够把你选定月份内的抖音作品播放量、点赞量、封面图和标题导出来。使用前提是你必须有登录到这个账号后台的权限，不能看陌生人的账号数据哦！
