var os = require('os');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var _ = require('lodash');

var app = express();

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

app.get('/', function(req, res) {
    console.log("hello from B");
    res.send('Hello from service B running on ' + os.hostname());
});

var comments = [
    { _id: 0, articleID: 0, text: "Great article." },
    { _id: 1, articleID: 0, text: "I wish the author would explain more about the context of his experience." },
    { _id: 2, articleID: 1, text: "Very thoroughly researched, top notch journalism." },
];

var premadeComments = [
    { text: "nuklear.h is 20,000 lines long. Is the whole thing written in the header file?" },
    { text: "Why would we raise prices on ANY solar panels? That seems self-defeating to me. It doesn't really matter where they come from. Any solar panels are good solar panels." },
    { text: "I very likely am biased as my primary income doesn't come from my written literary works, but as a published author, I simply don't get the PoV of the publishing/music/movie industry." },
    { text: "A lot of people don't even know what Pentium or Celeron is.. And the ones who do will propably check online reviews ;)" },
    { text: 'Indeed - and I also fail to see what was so "insightful"/"good"/"fascinating" about it either, just some relatively old stats and some copy badly in need of an edit. Clearly a voting ring.' },
    { text: "Shameless plug: If you want to participate in India's progress towards bigger rooftop-solar, please consider joining http://www.oorjan.com." },
    { text: "That, and the integrated gifbot. My teenage sister went crazy when I showed her how to search for stickers." },
    { text: "So how does this compare to Vagrant?" },
    { text: "Those problems you cited all pale in comparison to global warming. It's a disingenuous comparison." },
    { text: "oQS would work for people who don't have a smartphone...but is there a lot of overlap between people who have an old phone and people who want to track quantified self data?" },
    { text: "It's quite obvious that very few are disproportionally benefiting from modern tech. Unlikely to sustain much longer. Doug Rushkoff has a good talk on this - https://www.youtube.com/watch?v=87TSoqnZass There is a shorter version on BigThink." },
    { text: "I'd love to see an autonomous F1 series!" },
    { text: "He said that? Can you please provide the quote?" },
    { text: "So probably needs in excess of 750 ton. And more likely twice as a house would more likely have a 5m 'chimney'. Clearly not viable. Thanks." },
    { text: "Does that make sense? I fear it doesn't." },
    { text: "Sounds exciting!" },
    { text: "I like 3d touch and use it often on both my phone and macbook pro." },
    { text: "This is what all the pilots I've met are saying." },
    { text: "I've heard about this as well - a friend's startup has a vast free infrastructure on Azure using the same program, but I think though you'll be in troubles having to migrate to AWS/GCE when you run out of the free credits and your startup survives one year and migration is the last thing you wanna deal with at that time. :)" },
    { text: "Maybe freight would be the initial area to introduce them, as the risk of loss of life is minimised." },
    { text: "I like these wooden maps but I'm wondering if they are really practical : if you don't know the terrain I'm not sure how it can help you and if you know the terrain you probably don't need the map." },
    { text: "The article says most flying is automated these days. I can see the need for a human in the loop for special conditions. However, humans do make errors, and sometimes act maliciously. How far are we, do you think, from self-flying planes?" },
    { text: "Barking up the wrong tree. They are different games with different goals and all 3 can be incredibly complex." },
    { text: "Out of curiosity, why are you seeing hundreds of renders per image? I'd think it'd be significantly fewer than that, unless you've got a lot of stuff going on in the background that isn't really obvious" },
    { text: "Bikes already have two really large flywheels." },
    { text: "There's no Fun that good old fashioned Risk Management can't ruin." },
    { text: "Talk about your clickbait headlines." },
    { text: "They may have the right to, but what percentage of bikes are inspected?" },
    { text: "Cycling has actually gotten cleaned up a lot lately. There are various teams with 'no needles' policies, and very strict monitoring of what people are ingesting in terms of vitamins and so forth." },
    { text: "Next up: taxes on solar cells?" },
    { text: "It sounds like a two part problem: getting the job, and doing well at the job, and they are orthogonal." }
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/api/articles/:id/comments', function(req, res) {
    var articleID = req.params.id;
    //var commentsByArticleID = _.filter(comments, function(o) { return o.articleID == articleID });
    
    var numberOfRandomComments = getRandomInt(2, 4);
    var randomComments = [];
    for (i=0; i < numberOfRandomComments; i++) {
        randomComments.push(premadeComments[getRandomInt(0, premadeComments.length-1)]);
    } 
    var commentsByArticleID = randomComments;
     
    // console.log("found articles for articleID:" + articleID + ", %j", commentsByArticleID);
    
    res.send(commentsByArticleID);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on port " + port);
});