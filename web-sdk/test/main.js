const TOKEN = 'ppii7jsewq8';

(function() {
	window.onload = function() {
		const div = document.querySelector('#votingnode');
		window.Voter.setupVote(TOKEN, div);
	}
})();
