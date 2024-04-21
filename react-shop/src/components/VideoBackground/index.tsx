import Styles from './VideoBackground.module.scss'

const VideoBackground = () => {
	return (
		<div className={Styles.videobackground}>
			<video autoPlay loop muted>
				<source
					src='https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1203420/96bacf40b7534eac4ee56d9a033c7498e2246d8f.webm'
					type='video/mp4'
				/>
			</video>
		</div>
	)
}

export default VideoBackground
