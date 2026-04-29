(() => {
    'use strict';

    const dom = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        progressFill: document.getElementById('progress-fill'),
        progressText: document.getElementById('progress-text'),
        timeMoscow: document.getElementById('time-moscow'),
        timeIrkutsk: document.getElementById('time-irkutsk')
    };

    const currentYear = new Date().getUTCFullYear();
    const startTs = Date.UTC(currentYear, 3, 27, 21, 0, 0);
    const endTs = Date.UTC(currentYear, 4, 1, 16, 0, 0);
    const totalDuration = endTs - startTs;

    const pad = n => n.toString().padStart(2, '0');

    const updateText = (el, val) => {
        if (el.textContent !== val) el.textContent = val;
    };

    const formatTime = (ts, offset) => {
        const d = new Date(ts + offset * 3600000);
        return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    };

    let lastSec = -1;

    const tick = () => {
        const now = Date.now();
        const currentSec = Math.floor(now / 1000);

        if (currentSec !== lastSec) {
            lastSec = currentSec;

            const rem = Math.max(0, endTs - now);
            const d = Math.floor(rem / 86400000);
            const h = Math.floor((rem % 86400000) / 3600000);
            const m = Math.floor((rem % 3600000) / 60000);
            const s = Math.floor((rem % 60000) / 1000);

            updateText(dom.days, pad(d));
            updateText(dom.hours, pad(h));
            updateText(dom.minutes, pad(m));
            updateText(dom.seconds, pad(s));

            const elapsed = Math.max(0, Math.min(now - startTs, totalDuration));
            const progress = (elapsed / totalDuration) * 100;

            dom.progressFill.style.width = `${progress}%`;
            updateText(dom.progressText, `${progress.toFixed(1)}%`);

            updateText(dom.timeMoscow, formatTime(now, 3));
            updateText(dom.timeIrkutsk, formatTime(now, 8));
        }

        requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
})();