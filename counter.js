// counter.js
function updateGlobalCounter() {
    // ব্রাউজার মেমোরি থেকে ডাটা নেওয়া (যদি না থাকে তবে ০ ধরবে)
    let totalCount = localStorage.getItem('rahbar_total_views') || 0;
    
    // সেশন চেক (একই ব্যক্তি বারবার রিফ্রেশ করলে যেন সংখ্যা না বাড়ে)
    if (!sessionStorage.getItem('counted_this_session')) {
        totalCount = parseInt(totalCount) + 1;
        localStorage.setItem('rahbar_total_views', totalCount);
        sessionStorage.setItem('counted_this_session', 'true');
    }

    // যদি পেজে 'visitor-count' আইডিওয়ালা কোনো এলিমেন্ট থাকে, তবে সেখানে সংখ্যা দেখাবে
    const countDisplay = document.getElementById('visitor-count');
    if (countDisplay) {
        // সংখ্যাটিকে বাংলা ফরম্যাটে (bn-BD) রূপান্তর করে দেখাচ্ছে
        countDisplay.innerText = parseInt(totalCount).toLocaleString('bn-BD');
    }
}

// পেজের কন্টেন্ট লোড হওয়ার সাথে সাথেই ফাংশনটি রান করবে (window.onload এর চেয়ে দ্রুত)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateGlobalCounter);
} else {
    updateGlobalCounter();
}