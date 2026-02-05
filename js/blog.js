// MoodLink - Blog Module
// Handles blog post display and modal functionality

// Blog posts data
const blogPosts = {
    relationship: {
        title: "How MoodLink Saved Our Relationship",
        author: "Sarah & Mike",
        category: "Relationships",
        emoji: "💕",
        content: `
            <p>My partner and I were struggling to communicate our feelings. We loved each other, but somehow we kept missing the emotional mark. I'd come home stressed from work, and Mike wouldn't know how to help. He'd try to fix problems when I just needed someone to listen. It was frustrating for both of us.</p>
            
            <p>A friend recommended MoodLink, and honestly, we were skeptical. Another app? But this one was different. There were no likes, no followers - just raw, honest emotions. The first night, we both sat down and selected our moods. I was "sad" and Mike was "confused."</p>
            
            <p>The magic happened when MoodLink showed us others feeling the same way. We weren't alone in our struggles. More importantly, we started understanding each other's emotional states without judgment. When I'm feeling "lonely," Mike now knows I need connection, not solutions. When he's "tired," I give him space instead of more tasks.</p>
            
            <p>We've been using MoodLink daily for six months now. Every morning, we share our moods over coffee. It's become our emotional check-in ritual. Sometimes we match with others and offer support. Sometimes we just read anonymous posts and realize we're not alone in our relationship struggles.</p>
            
            <p>Last week, Mike told me he loves how MoodLink helped him become a better partner. He said he finally understands that my feelings aren't problems to solve, but experiences to share. That's when I knew - this app didn't just save our relationship, it transformed it into something deeper and more authentic.</p>
            
            <p>We're still Sarah & Mike, still navigating life together. But now we have a tool that helps us speak the same emotional language. And that makes all the difference.</p>
        `
    },
    lonely: {
        title: "From Lonely to Connected",
        author: "Alex, 24",
        category: "Personal Stories",
        emoji: "🌈",
        content: `
            <p>The breakup hit me harder than I expected. Three years together, gone overnight. My apartment felt empty, my phone stayed silent, and I'd scroll through social media seeing everyone else living their best lives. The loneliness was crushing.</p>
            
            <p>I found MoodLink during a late-night scrolling session. What caught my attention was the promise of "no likes, no fake popularity." I was tired of performing happiness for others. I needed a place to be real.</p>
            
            <p>My first post was anonymous: "Feeling completely alone after a breakup. Does anyone else feel this way?" Within minutes, I had responses. Not pity, not "you'll get over it" platitudes. Real people sharing their own stories of heartbreak and healing.</p>
            
            <p>The Sad community became my daily refuge. We shared music playlists, comfort movie recommendations, and honest conversations about what it means to heal. I learned that loneliness isn't the absence of people, but the absence of understanding.</p>
            
            <p>Months passed. I started feeling "hopeful" more often than "sad." I connected with someone who was also healing from a breakup. We started as anonymous friends, then exchanged usernames, then video calls. Today, we're dating, building something new on foundations of emotional honesty.</p>
            
            <p>But MoodLink gave me more than a potential partner. It gave me a community. It taught me that vulnerability isn't weakness - it's the bridge that connects us. When I'm feeling down now, I know exactly where to go. And when I'm feeling good, I make sure to be there for others who are struggling.</p>
            
            <p>Loneliness doesn't disappear overnight, but it does become manageable when you know you're not alone in feeling it.</p>
        `
    },
    students: {
        title: "Students Supporting Students",
        author: "Jordan, College Student",
        category: "Student Life",
        emoji: "🎓",
        content: `
            <p>Finals week was destroying me. I was surrounded by textbooks, running on caffeine and anxiety, and convinced I was going to fail everything. My roommates were studying too, but we were all in our own bubbles of stress.</p>
            
            <p>Someone in my study group mentioned MoodLink's Students Stress Corner. I rolled my eyes at first - another distraction? But I was desperate, so I gave it a try.</p>
            
            <p>That's when I discovered my people. Hundreds of students from around the world, all going through the same hell. We weren't just complaining about exams; we were actively helping each other. Someone shared a genius way to memorize biology terms. Another posted a calming playlist for study sessions. A third offered virtual study breaks where we'd just breathe together for five minutes.</p>
            
            <p>I started posting my own study tips and encouragement. It felt good to help others while I was struggling. The community became my motivation. When I wanted to give up, I'd think about the other students counting on me to show up and share my knowledge.</p>
            
            <p>Something amazing happened - my grades improved, but more importantly, my relationship with learning changed. I wasn't just competing against my classmates anymore; we were all in this together.</p>
            
            <p>Now, even when it's not finals season, I check in with the Students Stress Corner. We celebrate A's together, console each other over B's (because let's be real, a B isn't the end of the world), and share resources for everything from time management to dealing with difficult professors.</p>
            
            <p>MoodLink taught me that academic stress doesn't have to be isolating. Together, we're turning stress into success, one study session at a time.</p>
        `
    },
    motivation: {
        title: "Daily Motivation That Changed My Life",
        author: "Taylor, 28",
        category: "Motivation",
        emoji: "💪",
        content: `
            <p>Mornings used to be my enemy. I'd wake up with a knot of anxiety in my stomach, already dreading the day ahead. Work stress, family obligations, the endless to-do list - it all felt like too much.</p>
            
            <p>I tried everything: meditation apps, gratitude journals, morning affirmations. Nothing stuck. Then I found MoodLink, and something clicked.</p>
            
            <p>Instead of forcing myself to feel positive, I started being honest about how I actually felt. Some mornings I was "anxious." Others I was "tired" or "overwhelmed." The magic was seeing that others felt the same way. I wasn't broken for having these feelings.</p>
            
            <p>The Motivation Tribe became my daily dose of reality. People shared their small wins: "Made it through a tough meeting," "Finally cleaned out that junk drawer," "Didn't cry in the grocery store today." These weren't huge achievements, but they were real.</p>
            
            <p>I started celebrating my own small wins too. Waking up on time. Taking a shower. Eating breakfast instead of skipping it. Each small victory built on the last.</p>
            
            <p>Three months later, I don't wake up with dread anymore. I wake up curious about how I'm feeling and how others in the community are doing. Some days I'm the one offering encouragement. Other days, I'm the one needing it. Either way, I know I'm not alone.</p>
            
            <p>MoodLink didn't fix my life, but it changed my relationship with it. I learned that motivation isn't about being positive all the time - it's about being honest and finding people who understand.</p>
        `
    },
    family: {
        title: "Our Family's Emotional Check-in Tool",
        author: "The Martinez Family",
        category: "Family",
        emoji: "👨‍👩‍👧‍👦",
        content: `
            <p>As parents of two teenagers, we were struggling. Our kids were pulling away, spending more time in their rooms than with us. Family dinners were silent affairs, everyone staring at their phones. We missed the connection we used to have.</p>
            
            <p>We tried everything: family game nights, forced conversations, taking away phones. Nothing worked. If anything, it pushed them further away.</p>
            
            <p>Then my husband suggested MoodLink. He'd read about it being used in schools for emotional intelligence. We were skeptical - would our teenagers really go for this?</p>
            
            <p>We made it a family experiment: everyone shares their mood anonymously each evening. No judgment, no questions, just sharing. The first week was awkward. But then something shifted.</p>
            
            <p>Our daughter started posting "sad" regularly. We didn't ask why, but we made sure to give her extra hugs. Our son was often "confused" about school. We started having low-pressure conversations about his classes.</p>
            
            <p>The breakthrough came when our daughter anonymously posted about feeling pressure from friends. That night at dinner, my husband shared his own story of peer pressure from high school. Suddenly, our daughter opened up. She told us everything. And we listened without trying to fix it.</p>
            
            <p>Now, MoodLink is part of our family routine. We still have anonymous check-ins, but we also have real conversations. The kids know they can be honest about their feelings without us freaking out. We know we can support them without overstepping.</p>
            
            <p>Our dinners aren't silent anymore. They're filled with stories, laughter, and sometimes tears. MoodLink didn't just help us understand our kids - it helped us become a more emotionally honest family.</p>
        `
    },
    recovery: {
        title: "From Depression to Hope",
        author: "Sam, 31",
        category: "Mental Health",
        emoji: "🌟",
        content: `
            <p>I was at rock bottom. Depression had me in its grip, and every day felt like wading through concrete. The simplest tasks felt impossible. Getting out of bed, showering, eating - everything required monumental effort.</p>
            
            <p>Therapy helped, medication helped, but I still felt so alone. My friends tried to understand, but they'd say things like "Just cheer up!" or "Think positive!" They meant well, but they didn't get it.</p>
            
            <p>I found MoodLink during one of my late-night internet spirals. What drew me in was the anonymity. I could be honest about how bad things were without worrying about judgment or unsolicited advice.</p>
            
            <p>My first journal entry was just: "I don't want to be alive anymore." I expected pity or concern. Instead, I received messages from people who got it. "I've been there," "It's okay to feel this way," "You're not broken."</p>
            
            <p>The anonymous journaling became my lifeline. Every day, I'd write about my thoughts and feelings. No filter, no performance. Just raw honesty. Some days were dark. Others had tiny glimmers of hope.</p>
            
            <p>Slowly, something started to shift. I noticed patterns in my moods. I could see that even on my worst days, there were moments of okay-ness. The community became my accountability partners. They celebrated my small wins: "I took a shower today!" "I went outside for five minutes!"</p>
            
            <p>It's been eight months now. I'm not "cured" - depression doesn't work like that. But I'm managing. I have tools, I have support, I have hope. Most importantly, I know I'm not alone.</p>
            
            <p>MoodLink didn't fix my depression, but it gave me a space to be honest about it. And in that honesty, I found the strength to keep going, one day at a time.</p>
        `
    }
};

// Open blog post modal
function openBlogPost(postId) {
    const post = blogPosts[postId];
    if (!post) return;
    
    // Update modal content
    document.getElementById('blog-modal-title').textContent = post.title;
    document.getElementById('blog-modal-author').textContent = `By ${post.author}`;
    document.getElementById('blog-modal-category').textContent = post.category;
    document.getElementById('blog-modal-content').innerHTML = post.content;
    
    // Show modal
    document.getElementById('blog-modal').classList.remove('hidden');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close blog modal
function closeBlogModal() {
    document.getElementById('blog-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { openBlogPost, closeBlogModal, blogPosts };
}
