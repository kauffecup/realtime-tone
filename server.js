const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const toneAnalyzer = require('watson-developer-cloud').tone_analyzer({
  username: '<username>',
  password: '<password>',
  version: 'v3',
  version_date: '2016-05-19'
});

// default port is 3000
app.set('port', process.env.PORT || 3000);

// serve index.html
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// when we receive our websocket tone request, analyze it and emit the
// calculated color along with what text it belongs to
io.on('connection', socket => {
  socket.on('tone message', text => {
    toneAnalyzer.tone({ text }, (err, tone) => {
      if (err) {
        console.error(err);
      } else {
        io.emit('tone', {
          text,
          color: calculateColor(tone)
        });
      }
    });
  });
});

// start up our server
server.listen(app.get('port'), () => {
  console.log(`listening on ${app.get('port')}`);
});

// a fun method with a gross abuse of object deconstruction
// converts the response of the watson tone object into an rgb string
// it certainly is not perfect
function calculateColor({document_tone: { tone_categories: [
  {tones: [{score: anger}, {score: disgust}, {score: fear}, {score: joy}, {score: sadness}]},
  {tones: [{score: analytical}, {score: confident}, {score: tentative}]},
  {tones: [{score: openness}, {score: conscientiousness}, {score: extraversion}, {score: agreeableness}, {score: range}]}
]}}) {
  // emotional, writing, and social tone
  // joy, and confident contribute to yellow (...conscientiousness?)
  // sadness, and tentative contribute to blue  (...analytical?)
  // anger and fear contribute to red
  // openness, and agreeableness, and disgust contribute to green (?)
  const y = (joy + confident + conscientiousness)/3 * 255;
  const r = Math.max((anger + fear)/2 * 255, y);
  const g = Math.max((openness + agreeableness + disgust)/3 * 255, y);
  const b = (sadness + tentative + analytical)/3 * 255;

  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
}
