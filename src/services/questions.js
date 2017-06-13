import config from '../config.json';

const getQuestions = () => {
  return fetch(`https://api.trello.com/1/lists/${config.trelloListId}/cards?checklists=all&fields=name,labels`)
    .then(res => res.json())
    .then(data => {
      const questions = [];
      const labels = [];
      data.forEach(card => {
        const { answers, correctAnswers } = getAnswers(card.checklists[0].checkItems);
        const cardLabels = card.labels.map(label => ({ id: label.id, name: label.name }));
        const question = {
          id: card.id,
          title: card.name,
          labels: cardLabels,
          answers,
          correctAnswers,
        }
        questions.push(question);

        cardLabels
          .filter(label => labels.find(l => l.id === label.id) === undefined)
          .forEach(label => labels.push(label));
      });
      return { questions, labels };
    });
}

const getAnswers = items => {
    const answers = [];
    const correctAnswers = [];
    items.forEach(item => {
      answers.push({ id: item.id, text: item.name, selected: false })
      if (item.state === 'complete') {
        correctAnswers.push(item.id);
      }
    });
    return { answers, correctAnswers };
  }

export default getQuestions;
