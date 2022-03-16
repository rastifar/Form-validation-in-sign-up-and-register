
const validation = (data,type) => {

    const errors = []

  
    if (!data.email.trim()) {
        errors.email = 'پست الکترونیکی اجباری است'
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email ='پست الکترونیکی معتبر نیست'
    }
    else {
        delete errors.email
    }
    if (!data.password.trim()) {
        errors.password = 'کلمه عبور اجباری است'
    } else {
        delete errors.password
    }
  
    if (type === 'signup') {
        if (!data.firstName.trim()) {
            errors.firstName = 'نام اجباری است'
        } else {
            delete errors.firstName
        }
        if (!data.lastName.trim()) {
            errors.lastName = 'نام خانوادگی اجباری است'
        } else {
            delete errors.lastName
        }
        if (!data.education.trim()) {
            errors.education = 'تحصیلات احباری است'
        } else {
            delete errors.education
        }
        if (!data.institute.trim()) {
            errors.institute = 'محل تحصیل اجباری است'
        } else {
            delete errors.institute
        }
        if (!data.province) {
            errors.province = 'انتخاب استان اجباری است'
        } else {
            delete errors.province
        }
        if (!data.city) {
            errors.city = 'انتخاب شهر اجباری است'
        } else {
            delete errors.city
        }
        
    }
    
    return errors;

};

export default validation;