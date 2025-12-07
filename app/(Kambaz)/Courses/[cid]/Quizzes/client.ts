import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};

export const createQuizForCourse = async (courseId: string, quiz: any = {}) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};

export const findQuestionsForQuiz = async (courseId: string, quizId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions`);
  return data;
};

export const createQuestionForQuiz = async (courseId: string, quizId: string, question: any = {}) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions`,
    question
  );
  return data;
};
export const updateQuestion = async (courseId: string, quizId: string, question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${question._id}`,
    question
  );
  return data;
};

export const deleteQuestion = async (courseId: string, quizId: string, questionId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${questionId}`
  );
  return data;
};

export const findAttemptsForStudent = async (courseId: string, quizId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/attempts/student`);
  return data;
};

export const getLatestAttempt = async (courseId: string, quizId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/attempts/latest`);
  return data;
};
export const submitQuizAttempt = async (courseId: string, quizId: string, answers: any[]) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`,
    { answers }
  );
  return data;
};
