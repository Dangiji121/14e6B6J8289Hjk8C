var blogURL = window.location.origin;
var labels = ["Result", "Admit card", "Latest jobs", "Answer Key", "Syllabus", "Admission"];
var maxResults = 8;
var startIndex = [1, 1, 1, 1, 1, 1];
var containers = ['container1', 'container2', 'container3', 'container4', 'container5', 'container6'];
var buttons = ['view-more-1', 'view-more-2', 'view-more-3', 'view-more-4', 'view-more-5', 'view-more-6'];

function loadPosts(label, index) {
    var script = document.createElement('script');
    script.src = blogURL + '/feeds/posts/summary/-/' + label + '?alt=json&start-index=' + startIndex[index] + '&max-results=' + maxResults + '&callback=showPosts' + index;
    document.head.appendChild(script);
}

function createPostList(posts, containerId, buttonId, startIdx) {
    var content = '<ul>';
    for (var i = 0; i < posts.length; i++) {
        var title = posts[i].title.$t;
        var link = posts[i].link.find(function(l) { return l.rel === 'alternate'; }).href;
        content += '<li>';
        content += '<a href="' + link + '" target="_blank"> ' + title + '</a>';
        content += '</li>';
    }
    content += '</ul>'; // End the unordered list

    document.querySelector(`#${containerId} .posts-list`).innerHTML += content;
    document.getElementById(buttonId).style.display = posts.length === maxResults ? 'block' : 'none';
    startIndex[startIdx] += maxResults;
}

function showPosts0(data) { createPostList(data.feed.entry, 'container1', 'view-more-1', 0); }
function showPosts1(data) { createPostList(data.feed.entry, 'container2', 'view-more-2', 1); }
function showPosts2(data) { createPostList(data.feed.entry, 'container3', 'view-more-3', 2); }
function showPosts3(data) { createPostList(data.feed.entry, 'container4', 'view-more-4', 3); }
function showPosts4(data) { createPostList(data.feed.entry, 'container5', 'view-more-5', 4); }
function showPosts5(data) { createPostList(data.feed.entry, 'container6', 'view-more-6', 5); }

// Initial load
for (var i = 0; i < labels.length; i++) {
    loadPosts(labels[i], i);
}

// Load more event handlers
document.getElementById('view-more-1').addEventListener('click', function() { loadPosts(labels[0], 0); });
document.getElementById('view-more-2').addEventListener('click', function() { loadPosts(labels[1], 1); });
document.getElementById('view-more-3').addEventListener('click', function() { loadPosts(labels[2], 2); });
document.getElementById('view-more-4').addEventListener('click', function() { loadPosts(labels[3], 3); });
document.getElementById('view-more-5').addEventListener('click', function() { loadPosts(labels[4], 4); });
document.getElementById('view-more-6').addEventListener('click', function() { loadPosts(labels[5], 5); });
