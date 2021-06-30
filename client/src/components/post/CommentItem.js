import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
import formateDate from "../../utils/formatDate";

const CommentItem = ({
	postId,
	comment: { _id, text, name, avatar, user, date },
	auth,
	deleteComment,
}) => {
	return (
		<div class="post bg-white p-1 my-1">
			<div>
				<Link to={`/profle/${user}`}>
					<img class="round-img" src={avatar} alt="" />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p class="my-1">{text}</p>
				<p class="post-date">{formateDate(date)}</p>
				{!auth.loading && user === auth.user._id && (
					<button
						onClick={() => deleteComment(postId, _id)}
						type="button"
						className="btn btn-danger"
					>
						<i className="fas fa-times"></i>
					</button>
				)}
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	deleteComment: PropTypes.func.isRequired,
	postId: PropTypes.number.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
