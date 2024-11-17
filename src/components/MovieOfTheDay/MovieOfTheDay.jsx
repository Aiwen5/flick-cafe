import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import styles from './MovieOfTheDay.module.css';
import MovieDatabase from '../../data/MovieDatabase';

const placeholderImage = 'https://placehold.co/290x400';

function getMovieOfTheDay() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date().getDay();
  const dayName = days[today];
  const currentWeek = `week${Math.ceil((new Date().getDate() - 1) / 7) % 2 === 0 ? 2 : 1}`;
  return MovieDatabase[currentWeek][dayName];
}

function getTimeRemaining(endTime) {
  const total = Date.parse(endTime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  return {
    total, hours, minutes, seconds
  };
}

export default function MovieOfTheDay() {
  const movie = getMovieOfTheDay();
  const imageToShow = movie.imageSrc || placeholderImage;

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(new Date().setHours(18, 0, 0, 0)));
  const [status, setStatus] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const endTime = new Date().setHours(18, 0, 0, 0);
      const remaining = getTimeRemaining(endTime);
      setTimeRemaining(remaining);

      const currentTime = new Date();
      const movieEndTime = new Date(endTime);
      movieEndTime.setMinutes(movieEndTime.getMinutes() + movie.runTime);

      if (currentTime >= endTime && currentTime <= movieEndTime) {
        setStatus('Currently Playing');
      } else if (currentTime > movieEndTime) {
        setStatus('Finished Airing');
      } else {
        setStatus('Upcoming');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [movie.runTime]);

  return (
    <div className={styles.movieOfTheDayCard}>
      <img className={styles.image} src={imageToShow} alt={`${movie.title} Poster`} />
      <div className={styles.content}>
        <h2 className={styles.title}>{movie.title}</h2>
        <h3 className={styles.subtitle}>{movie.subtitle}</h3>
        <p className={styles.description}>{movie.description}</p>
        <p className={styles.status}>{status}</p>
        {status === 'Upcoming' && (
          <p className={styles.countdown}>
            Time until screening: {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
          </p>
        )}
      </div>
    </div>
  );
}

MovieOfTheDay.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
  runTime: PropTypes.number.isRequired,
};

MovieOfTheDay.defaultProps = {
  imageSrc: placeholderImage,
};