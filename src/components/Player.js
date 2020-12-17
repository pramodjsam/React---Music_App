import React,{useState,useRef,useEffect} from 'react';
import PlayerDetails from './PlayerDetails';
import PlayerControls from './PlayerControls';

const Player=(props)=>{
	const audioRef=useRef(null);
	const[isPlaying,setIsPlaying]=useState(false);
	useEffect(()=>{
		if(isPlaying){
			audioRef.current.play();
		}else{
			audioRef.current.pause();
		}
	})

	const SkipSongs=(forwards=true)=>{
		if(forwards){
			props.setCurrentSongIndex(()=>{
				let temp=props.currentSongIndex;
				temp++;
				if(temp>props.songs.length - 1){
					temp=0;
				}
				return temp;
			})
		}else{
			props.setCurrentSongIndex(()=>{
				let temp=props.currentSongIndex;
				temp--;
				if(temp<0){
					temp=props.songs.length - 1;
				}
				return temp;
			})
		}
	}

	return(
		<div className='c-player'>
			<audio src={props.songs[props.currentSongIndex].src} ref={audioRef}></audio>
			<h4>Playing Now</h4>
			<PlayerDetails song={props.songs[props.currentSongIndex]} />
			<PlayerControls 
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				SkipSongs={SkipSongs}
			/>
			<p><strong>Next Up </strong> 
			{props.songs[props.nextSongIndex].title} by {props.songs[props.nextSongIndex].artist}
			</p>
		</div>
	)
}

export default Player;