import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const createCourse = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);

  return result;
};

const getAllCourses = async () => {
  const allCourses = await CourseModel.find({});
  return allCourses;
};

const getSingleCourse = async (courseId: string) => {
  const courseData = await CourseModel.findById(courseId);
  return courseData;
};

const updateSingleCourse = async (
  courseId: string,
  payload: Partial<TCourse>,
) => {
  const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, payload);
  return updatedCourse;
};

const deleteSingleCourse = async (courseId: string) => {
  const deletedCourse = await CourseModel.findByIdAndUpdate(
    courseId,
    { isDeleted: true },
    { new: true },
  );
};

export const courseServices = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateSingleCourse,
  deleteSingleCourse,
};
