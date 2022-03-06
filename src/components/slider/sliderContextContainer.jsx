import { QuestionContextProvider } from '../../context/questionContext'

// Components
import Slider from './slider'

const SliderContextContainer = () => {
  return (
    <>
      <QuestionContextProvider>
        <Slider />
      </QuestionContextProvider>
    </>
  )
}

export default SliderContextContainer
