import * as Yup from 'yup'

const SubmitReviewSchema = Yup.object().shape({
  rate: Yup.number().required('Rating is required'),
  text: Yup.string()
    .min(10, 'Your review is to short')
    .required("Review can't be empty")
})

export default SubmitReviewSchema
