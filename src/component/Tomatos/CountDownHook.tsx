import React, {useState, useEffect, FunctionComponent} from 'react';

interface ICountDownHookProps {
  countdown: number;
	onFinish: () => void;
}

let timerId:any

const CountDownHook:FunctionComponent<ICountDownHookProps> = (props)=> {
  // Declare a new state variable, which we'll call "count"
  const [countDown, setCountDown] = useState(props.countdown);
  
  const min = Math.floor(countDown/1000/60)
	const second = Math.floor(countDown/1000%60)
	const time = `${min}:${second<10?`0${second}`:second}`

  useEffect(() => {
		document.title = `${time} - 番茄APP`;
		timerId = setInterval(()=>{
			setCountDown(countDown - 1000)
			if(countDown < 0){
				props.onFinish()
				document.title = `番茄APP`;
				clearInterval(timerId)
			}
		},1000)
		return function cleanup() {
			clearInterval(timerId)
		};
	});

  return (
    <div>{time}</div>
  )
}

export default CountDownHook