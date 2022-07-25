/**
 @description * {
    date: string,
    times: Array<{
      status: string,
      calcius: string,
      time: string
    }>
  }
 */
declare interface weatherData {
  date: string,
  times: Array<{
    status: string,
    calcius: string,
    time: string
  }>
};

export default weatherData;