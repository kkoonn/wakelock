const statusText = document.querySelector("#wake-lock-status");
let wakeLock = null;

// スリープを防ぐ
async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake Lock が有効になりました");

        // 解除されたときのイベント
        wakeLock.addEventListener("release", () => {
            console.log("Wake Lock が解除されました");
        });
        statusText.textContent = "防止中";
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

// Wake Lock を解除
function releaseWakeLock() {
    statusText.textContent = "停止中";
    if (wakeLock !== null) {
        wakeLock.release();
        wakeLock = null;
        console.log("Wake Lock を手動で解除しました");
    }
}

// 使い方
document.querySelector("#start").addEventListener("click", requestWakeLock);
document.querySelector("#stop").addEventListener("click", releaseWakeLock);
