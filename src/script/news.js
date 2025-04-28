/**
 * News management script for TankStore Inc. website
 * Handles displaying news articles on the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load news data
    const newsArticles = [
        {
            id: 1,
            title: 'New Storage Facility Opened',
            date: 'October 15, 2023',
            summary: 'We are proud to announce the opening of our new state-of-the-art storage facility in Houston.',
            content: `
                <p>TankStore Inc. proudly announces the grand opening of our newest state-of-the-art storage facility in Houston, Texas. This expansion adds 500,000 barrels of storage capacity to our network.</p>
                <p>The new facility features the latest in safety technology, environmental protection systems, and efficient loading/unloading infrastructure. This investment represents our commitment to meeting the growing demands of the energy sector while maintaining the highest standards of operational excellence.</p>
                <p>"This expansion is a significant milestone in our company's growth strategy," said our CEO. "The Houston facility strengthens our position in a key market and enables us to better serve our clients across the Gulf Coast region."</p>
            `,
            image: '../assets/saron pics Done/img11.jpg'
        },
        {
            id: 2,
            title: 'Safety Excellence Award',
            date: 'August 3, 2023',
            summary: 'TankStore Inc. receives industry recognition for outstanding safety performance.',
            content: `
                <p>TankStore Inc. has been awarded the Safety Excellence Award by the National Storage Industry Association for our exemplary safety record and innovative safety protocols.</p>
                <p>This prestigious recognition highlights our team's dedication to maintaining the highest safety standards in all operations. Over the past five years, we have implemented our comprehensive Safety First program, resulting in zero lost-time incidents across all facilities.</p>
                <p>"Safety has always been our top priority," commented our Safety Director. "This award belongs to every employee who contributes to our culture of vigilance and continuous improvement in safety practices."</p>
            `,
            image: '../assets/saron pics Done/img12.jpg'
        },
        {
            id: 3,
            title: 'Environmental Certification Achieved',
            date: 'June 12, 2023',
            summary: 'All TankStore facilities now certified under ISO 14001 environmental management standards.',
            content: `
                <p>We are pleased to announce that all TankStore Inc. facilities have successfully achieved ISO 14001:2015 certification for environmental management systems.</p>
                <p>This certification verifies that our operations meet international standards for environmental responsibility. Our comprehensive approach includes advanced spill prevention systems, emissions reduction initiatives, and sustainable waste management practices.</p>
                <p>"This certification reflects our commitment to environmental stewardship," stated our Environmental Compliance Manager. "We believe that responsible storage operations and environmental protection go hand in hand."</p>
            `,
            image: '../assets/saron pics Done/img13.jpg'
        }
    ];

    // Display news articles on the homepage
    const latestNewsContainer = document.getElementById('latest-news');
    if (latestNewsContainer) {
        // Display only the latest 3 articles on the homepage
        const latestArticles = newsArticles.slice(0, 3);
        
        latestArticles.forEach(article => {
            const articleElement = createNewsArticleElement(article, true);
            latestNewsContainer.appendChild(articleElement);
        });
    }

    // Display all news articles on the news page
    const allNewsContainer = document.getElementById('all-news');
    if (allNewsContainer) {
        newsArticles.forEach(article => {
            const articleElement = createNewsArticleElement(article, false);
            allNewsContainer.appendChild(articleElement);
        });
    }

    // Display individual news article if on a single article page
    const singleNewsContainer = document.getElementById('single-news');
    if (singleNewsContainer) {
        // Get article ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = parseInt(urlParams.get('id'));

        if (articleId) {
            const article = newsArticles.find(a => a.id === articleId);
            if (article) {
                // Create the full article view
                const articleElement = document.createElement('div');
                articleElement.classList.add('news-article');
                
                articleElement.innerHTML = `
                    <div class="article-image">
                        <img src="${article.image}" alt="${article.title}">
                    </div>
                    <div class="article-content">
                        <h2>${article.title}</h2>
                        <p class="article-date">${article.date}</p>
                        <div class="article-body">
                            ${article.content}
                        </div>
                        <a href="news.html" class="btn btn-primary mt-4">Back to News</a>
                    </div>
                `;
                
                singleNewsContainer.appendChild(articleElement);
            } else {
                // Article not found
                singleNewsContainer.innerHTML = '<div class="alert alert-danger">News article not found</div>';
            }
        }
    }

    /**
     * Creates a news article HTML element
     * @param {Object} article - The article data
     * @param {boolean} isPreview - Whether this is a preview (for homepage) or full listing
     * @returns {HTMLElement} The article element
     */
    function createNewsArticleElement(article, isPreview) {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-card');
        
        articleElement.innerHTML = `
            <div class="news-img">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="news-content">
                <h3>${article.title}</h3>
                <p class="news-date">${article.date}</p>
                <p class="news-summary">${article.summary}</p>
                <a href="news.html?id=${article.id}" class="btn btn-primary btn-sm">Read More</a>
            </div>
        `;
        
        return articleElement;
    }
});