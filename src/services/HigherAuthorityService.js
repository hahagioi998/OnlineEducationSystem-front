import axios from 'axios';

const BASE_URL = "http://localhost:9090/springfox/api/higherAuthority";

class HigherAuthority {
    getStandards() {
        return axios.get(BASE_URL + '/standard');
    }
    getStandardById(id) {
        return axios.get(BASE_URL + '/standard/' + id);
    }
    getSubjectById(id) {
        return axios.get(BASE_URL + '/subject/' + id);
    }
    getSubjects() {
        return axios.get(BASE_URL + '/subject');
    }
    assignStandardSubjectTeacherRole(teacher) {
        return axios.post(BASE_URL + '/standardSubjects', teacher);
    }
    CreateStandard(standard) {
        return axios.post(BASE_URL + '/standard', standard);
    }
    CreateSubject(subject) {
        return axios.post(BASE_URL + '/subject', subject);
    }
    getAllTeachers() {
        return axios.get(BASE_URL + '/teacherRegistration');
    }
    getAllStdSubTeachers() {
        return axios.get(BASE_URL + '/standardSubjects');
    }
    getAllByTeacherId(id) {
        return axios.get(BASE_URL + '/standardSubjects/teacher/' + id);
    }
    updateStandard(standard, id) {
        return axios.put(BASE_URL + '/standard/' + id, standard);
    }
    updateSubject(subject, id) {
        return axios.put(BASE_URL + '/subject/' + id, subject);
    }
    deleteStdSubAllocation(id){
        return axios.delete(BASE_URL+'/standardSubjects/'+id);
    }

}
export default new HigherAuthority()