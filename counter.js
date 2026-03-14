// counter.js
function updateGlobalCounter() {
    const countDisplay = document.getElementById('visitor-count');
    if (!countDisplay) return;

    // একই সেশনে বারবার কাউন্ট হওয়া রোধ করতে সেশন চেক
    const hasCounted = sessionStorage.getItem('counted_rahbar_live');

    // CountAPI ব্যবহার করে অনলাইনে ডাটা সেভ এবং রিট্রিভ করা
    // এখানে 'rahbar-library-johir' একটি ইউনিক কি (Key) হিসেবে কাজ করবে
    const namespace = "maktaba-johir.github.io";
    const key = "rahbar-library-total";

    if (!hasCounted) {
        // নতুন ভিউ হলে কাউন্ট ১ বাড়াবে (Hit)
        fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
            .then(res => res.json())
            .then(data => {
                countDisplay.innerText = data.value.toLocaleString('bn-BD');
                sessionStorage.setItem('counted_rahbar_live', 'true');
            })
            .catch(err => {
                console.log("Counter Error:", err);
                countDisplay.innerText = "১"; // এরর হলে ডিফল্ট ১
            });
    } else {
        // সেশনে অলরেডি কাউন্ট হয়ে থাকলে শুধু বর্তমান ভিউ সংখ্যা দেখাবে (Get)
        fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
            .then(res => res.json())
            .then(data => {
                countDisplay.innerText = data.value.toLocaleString('bn-BD');
            })
            .catch(err => console.log("Counter Error:", err));
    }
}

// পেজ লোড হলে রান করবে
updateGlobalCounter();
