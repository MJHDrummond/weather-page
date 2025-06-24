  export const getCurrentDatetime = () => {
    const now = new Date();

    console.log(now.toISOString());

    const minutes = Math.floor(now.getMinutes() / 5) * 5;
    now.setMinutes(minutes);
    now.setSeconds(0);
    now.setMilliseconds(0);

    console.log(now.toISOString());

    const pad = (n) => String(n).padStart(2, '0');
    return (
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      pad(now.getHours()) +
      pad(now.getMinutes())
    );
  };

  export const getEarlierDatetime = (datetimeStr, minutes) => {
    const year = datetimeStr.slice(0, 4);
    const month = datetimeStr.slice(4, 6);
    const day = datetimeStr.slice(6, 8);
    const hour = datetimeStr.slice(8, 10);
    const minute = datetimeStr.slice(10, 12);

    const date = new Date(year, month - 1, day, hour, minute);
    date.setMinutes(date.getMinutes() - minutes);

    const pad = (n) => String(n).padStart(2, '0');
    return (
      date.getFullYear().toString() +
      pad(date.getMonth() + 1) +
      pad(date.getDate()) +
      pad(date.getHours()) +
      pad(date.getMinutes())
    );
  };