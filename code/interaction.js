
var cat_image = document.getElementById('cat_image');
var feed_button = document.getElementById('feed_button');
var run_button = document.getElementById('run_button');

cat_image.onclick = function() {
	alert('Meow!');	
}; 


feed_button.addEventListener("click", feed);
function feed() {
    cat_image.style.width = (cat_image.offsetWidth + 30) + 'px';
};

run_button.addEventListener("click", run);
function run() {
    cat_image.style.width = (cat_image.offsetWidth - 30) + 'px';
};

