import React from 'react'

const SpecialityPage = async ({ params }) => {
      const { speciality } =  await params
  return (
    <div>
      SpecialityPage: {speciality}
    </div>
  )
}

export default SpecialityPage
