import { getProfile } from '@ist-supsi/bmsjs';

let data = [];
export const getData = async id => {
  await getProfile(id)
    .then(response => {
      if (response.data.success) {
        data = response.data.data;
      } else {
        alert(response.data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });

  return data;
};
