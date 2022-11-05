import axios from 'axios'
import React from 'react'

import logProviderFactory from '../../../../utils/logs/logProviderFactory'
// import Header from './Header'
import JobList from './JobList'
import css from './JobsSection.scss'
//import { filtersMap } from './utils'

const Jobs = () => {
  //const [jobs, setJobs] = React.useState([])
  const [filteredJobs, setFilteredJobs] = React.useState([])
  //const [jobIndex, setJobIndex] = React.useState<number>(0)
  const api = 'jCanloEQVW8kqnf0dPPuyEr86UvGEoRB'
  // const jazzApi = axios.create({
  //   baseURL: 'https://api.resumatorapi.com/v1',
  //   params: {
  //     apikey: api,
  //   },
  //   headers: {},
  // })
  const getJobs = async () => {
    try {
      // http://www.resumatorapi.com/v1/#!/jobs/jobs_get
      const jobsResponse = await axios.get(`https://api.resumatorapi.com/v1/jobs/status/open?apikey=${api}`, {})
      setFilteredJobs(jobsResponse.data)
    } catch (err) {
      logProviderFactory.logError(err)
    }
  }

  React.useEffect(() => {
    getJobs()
  }, [])

  /*
  React.useEffect(() => {
    // debug piece to get a list of unique departments
    // const departments: any = []
    // const jobsDepartments: any = []
    // jobs.forEach((job: any) => {
    //   if (departments.indexOf(job.department) == -1 && job.status == 'Open') {
    //     departments.push(job.department)
    //     jobsDepartments.push(job)
    //   }
    // })
    // console.log({ departments })
    // console.log({ jobsDepartments })

    const allJobs = jobs.filter((job: any) => {
      return job?.status === 'Open'

      // this commented block is for when implementing filtering
      // if (jobIndex === 0) {
      //   return job?.status === 'Open'
      // } else {
      //   return (
      //     job?.status === 'Open' &&
      //     job?.department === filtersMap.find((filterOpt) => filterOpt.value === jobIndex)?.mapToDepartment
      //   )
      // }
    })
    setFilteredJobs(allJobs)
  }, [jobs /*jobIndex])
  */

  return (
    <div className={css.background}>
      {/* <Header jobIndex={jobIndex} setJobIndex={setJobIndex} /> */}
      <JobList jobIndex={0} allJobs={filteredJobs} />
    </div>
  )
}

export default Jobs
