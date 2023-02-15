import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

// var callback = function () {};

// player.off('eventName', callback);

const currentTime = function (data) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(data.seconds)
  );
  let time = Number(localStorage.getItem('videoplayer-current-time'));
  console.log(time);

  // data is an object containing properties specific to that event
  // data — это объект, содержащий свойства, специфичные для этого события
};

player.on('timeupdate', currentTime);

player
  .setCurrentTime(30)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

//   обновление времени
// Запускается по мере currentTimeобновления видео. Обычно он срабатывает каждые 250 мс, но может варьироваться в зависимости от браузера.

// {
//     duration: 61.857
//     percent: 0.049
//     seconds: 3.034
// }
