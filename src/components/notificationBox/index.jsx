import './index.scss';

export default function NotiBox ( {notiType, notification, closeNoti, confirmDelete} ) {
	const close = () => {
		if(notiType !== 'waiting')
			closeNoti()
	}

	const confirm = () => {
		confirmDelete();
	}

	return (
		notification ? 
		<div className="notification" id={notiType.toString()} onClick={close}>
			{ notification } <br/> <br/>
			{
				notiType !== 'waiting' ?
				<small>Click anywhere to close</small>
				: 
				<></>
			}
			{
				notiType === 'deleteConfirm' ?
				<div className="btn-field" >
					<button className="confirm-delete-btn" onClick={confirm}>	Delete	</button>
					<button className="cancel-delete-btn" onClick={close}>	Cancel	</button>
				</div> :
				<></>
			}
		</div>
		:
		<></>
	)
}

