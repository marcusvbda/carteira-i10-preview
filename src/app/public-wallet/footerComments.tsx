'use client';
import { CSSProperties, ReactNode, useState } from 'react';
import Icon from '@/components/common/icon';

const Comment = ({ setAnswerVisibility, answerVisibility }: any): ReactNode => {
	return (
		<div className={`comment-item ${answerVisibility ? 'showing' : ''}`}>
			<div className="avatar-col">
				<div
					className="avatar-icon"
					style={
						{
							'--image-avatar': `url(/images/theme/avatar.svg)`,
						} as CSSProperties
					}
				/>
			</div>
			<div className="content-comment">
				Rerum consequatur veniam. Ipsa ipsa ullam alias. Vel et corporis non
				minus. Ut culpa sint praesentium vitae cumque incidunt ea harum.
				<div className="btns">
					<button className="btn default small">
						<Icon icon="/images/theme/like-comment.svg" width="16px" />
						(0)
					</button>
					{answerVisibility !== undefined ? (
						<>
							<button className="btn default small">Responder</button>

							<button
								className={`btn default small answer ${answerVisibility ? '' : 'active'}`}
								onClick={() => setAnswerVisibility(!answerVisibility)}
							>
								22 Respostas
								<Icon
									icon="/images/theme/more-comments.svg"
									width="13.751px"
									height="7.501px"
								/>
							</button>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

const CommentItem = (): ReactNode => {
	const [answerVisibility, setAnswerVisibility] = useState(true);

	return (
		<>
			<Comment
				answerVisibility={answerVisibility}
				setAnswerVisibility={setAnswerVisibility}
			/>
			{answerVisibility && (
				<div className="answer-list">
					<div className="comment-list">
						<Comment />
					</div>
					<NewComment />
				</div>
			)}
		</>
	);
};

const NewComment = (): ReactNode => {
	const [comment, setComment] = useState(
		'Dolore cupiditate ea et quo velit delectus asperiores consequuntur. Quidem ut perferendis beatae velit esse assumenda inventore. Beatae perferendis earum in at. Et adipisci veritatis et est voluptas. Sint sint repudiandae sapiente a rerum consequatur ut aliquid dolorem.',
	);

	return (
		<div className="new-comment-row">
			<div
				className="avatar-icon"
				style={
					{
						'--image-avatar': `url(/images/theme/avatar.svg)`,
					} as CSSProperties
				}
			/>
			<div className="textarea">
				<textarea
					rows={2}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				{comment !== '' && (
					<button className="btn primary small">Enviar</button>
				)}
			</div>
		</div>
	);
};

export default function FooterComments() {
	return (
		<div className="footer-comments">
			<div className="content">
				<h4 className="title">
					<div className="icon">
						<Icon icon="/images/theme/comments.svg" width="20px" />
					</div>
					Discussão
				</h4>
				<div className="description">
					Envia dúvidas ou comentários públicos aqui :)
				</div>
				<div className="comment-list">
					<CommentItem />
				</div>
				<NewComment />
			</div>
		</div>
	);
}
