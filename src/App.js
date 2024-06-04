import React, { Component } from 'react';
import { QUESTIONS } from './questions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 1,
      yesCount: 0,
      totalRuns: 0,
      totalScore: 0,
      averageScore: 0,
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.resetQuiz = this.resetQuiz.bind(this);
  }

  componentDidMount() {
    const totalRuns = parseInt(localStorage.getItem('totalRuns')) || 0;
    const totalScore = parseInt(localStorage.getItem('totalScore')) || 0;
    const averageScore = totalRuns > 0 ? totalScore / totalRuns : 0;
    this.setState({ totalRuns, totalScore, averageScore });
  }

  handleAnswer(answer) {
    const { currentQuestionIndex, yesCount } = this.state;
    const newYesCount = answer === 'yes' ? yesCount + 1 : yesCount;

    if (currentQuestionIndex < Object.keys(QUESTIONS).length) {
      this.setState({
        currentQuestionIndex: currentQuestionIndex + 1,
        yesCount: newYesCount,
      });
    } else {
      const score = this.calculateScore(newYesCount);
      this.updateStorage(score);
      alert(`Your score: ${score}`);
      this.resetQuiz();
    }
  }

  calculateScore(yesCount) {
    return (100 * yesCount) / Object.keys(QUESTIONS).length;
  }

  updateStorage(score) {
    let { totalRuns, totalScore } = this.state;
    totalRuns += 1;
    totalScore += score;
    const averageScore = totalScore / totalRuns;

    localStorage.setItem('totalRuns', totalRuns);
    localStorage.setItem('totalScore', totalScore);

    this.setState({ totalRuns, totalScore, averageScore });
  }

  resetQuiz() {
    this.setState({
      currentQuestionIndex: 1,
      yesCount: 0,
    });
  }

  render() {
    const { currentQuestionIndex, totalRuns, averageScore } = this.state;

    return (
      <div className="main__wrap">
        <main className="container">
          <div>
            TODO
          </div>
        {currentQuestionIndex <= Object.keys(QUESTIONS).length ? (
          <div>
            <p>{QUESTIONS[currentQuestionIndex]}</p>
            <button className="btn-yes" onClick={() => this.handleAnswer('yes')}>Yes</button>
            <button className="btn-no"onClick={() => this.handleAnswer('no')}>No</button>
          </div>
        ) : null}
        <div>
          <p>Total Runs: {totalRuns}</p>
          <p>Average Score: {averageScore.toFixed(2)}</p>
        </div>
        </main>
      </div>
    );
  }
}

export default App;