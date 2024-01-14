import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, CircularProgress, Skeleton } from '@mui/material';
import useWindowSize from '../../hooks/useWindowSize'
import { useQuery, gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'
import SkipNextIcon from '@mui/icons-material/SkipNext';


const Big5 = () => {

    const [width,] = useWindowSize()
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questionlist, setQuestionList] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const navigate = useNavigate()

    const GET_BIG5_QUERY = gql`
        query GetBig5Questions{
            getBig5Questions{
                question_id
                question
                options
            }
        }    
    `

    const SUBMIT_RESPONSE_QUERY = gql`
        mutation SendBig5Response($question_id:String, $response:String){
            sendBig5Response(question_id:$question_id, response:$response)
        }    
    `

    const { data, loading, error } = useQuery(GET_BIG5_QUERY, { fetchPolicy: "network-only" })
    const [doSubmitAnswer, { data: data1, loading: loading1, error: error1 }] = useMutation(SUBMIT_RESPONSE_QUERY)

    useEffect(() => {

        if (data1) {
            if (currentQuestionIndex <= questionlist.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1)
                setSelectedAnswer(null)
            }
            if (currentQuestionIndex == questionlist.length - 1) {
                navigate(0)
            }
        }

    }, [data1])


    if (data) {
        if (!questionlist) {
            if (data.getBig5Questions) {
                setQuestionList(data.getBig5Questions)
            }
        }
    }

    const onAnswerSubmit = ({ skip }) => {

        if (currentQuestionIndex < questionlist.length) {

            const { question_id } = questionlist[currentQuestionIndex]

            if (skip) {

                doSubmitAnswer({
                    variables: {
                        question_id: question_id,
                        response: "SKIP"
                    },
                    fetchPolicy: "network-only"
                })

            } else {

                if (selectedAnswer) {
                    doSubmitAnswer({
                        variables: {
                            question_id: question_id,
                            response: selectedAnswer
                        },
                        fetchPolicy: "network-only"
                    })
                }

            }

        }
    }


    const getDesktopView = () => {
        return <div>
            

        </div>
    }


    const getMobileView = () => {
        return <div style={{ padding: 30, height: "65vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            

        </div>
    }


    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
                {(width > 800 ? getDesktopView() : <></>)}
                {(width < 800 ? getMobileView() : <></>)}
            </div>
        </div>
    )
}

export default Big5