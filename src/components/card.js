import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import styled from 'styled-components'


const Card = () => {
  const { cards } = useStaticQuery(getCards)

  return (
    <>
      {cards.edges.map(({ node }) => (
        <CardWrapper key={node.id}>
          <Img
            fixed={node.image.fixed}
            alt={`${node.title} card`}
          />
          <h3>{node.title}</h3>
          <p>{node.text}</p>
        </CardWrapper>
      ))}
    </>
  )
}

export default Card


// query
const getCards = graphql`
  {
    cards: allContentfulCards(sort: {fields: title, order: ASC}) {
      edges {
        node {
          id: contentful_id
          title
          text
          image {
            fixed {
              ...GatsbyContentfulFixed
            }
          }
        }
      }
    }
  }
`

// styles
const CardWrapper = styled.div`
  width: 300px;
  height: 225px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-rows: 1fr 1fr;  /* divide in two equal rows */
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);

  /* Card hover effect */
  &:hover {
    transform: scale(1.1, 1.1);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  }
  &:hover .gatsby-image-wrapper {
    transform: translateY(-20px);
  }

  /* Style img */
  .gatsby-image-wrapper {
    position: absolute !important;
    top: 0;
    height: 110% !important;
    z-index: -1;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  h3 {
    color: white;
    font-size: 30px;
    margin: 20px 0 0 20px;
    width: 190px;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    align-self: end;
    margin: 0 0 20px 20px;
  }
`
