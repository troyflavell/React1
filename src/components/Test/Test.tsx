import React, { useEffect, useRef, ReactNode } from 'react'
import ReactDOMServer from 'react-dom/server'
import { showModalWith } from '../../utils/SharedFuntions'
interface Props {
  children?: ReactNode
  replaceBy: string 
  targetParentDepth: number 
  targetSelector: string
  transform: string 
  underline: boolean 
  popup: string 
  byClick: boolean 
}
interface CandidateTestInfo {
  alt: string
  definition: JSX.Element
}
const candidateTestData:{[key:string]:CandidateTestInfo} = {
  'organisation': {
    alt: 'organisation',
    definition: <>Where you see the word <strong>organisation</strong> used throughout this survey it refers to <strong>[[ CLIENT ]]</strong>.</>,
  },
  'exec': {
    alt: 'Executive Management', 
    definition: <><strong>Executive Management</strong> includes the most senior leaders in your organisation <br /> (e.g. CEO and the Leadership Team).</>,
  },
  'seni': {
    alt: 'Senior Management',
    definition: <><strong>Senior Management</strong> is defined as: <ul><li>Chief Executive Officer - <em>Firstname Lastname</em></li><li>Chief Operations Officer - <em>Firstname Lastname</em></li><li>Chief Financial Officer - <em>Firstname Lastname</em></li><li>Executive Director - <em>Firstname Lastname</em></li><li>Executive Director - <em>Firstname Lastname</em></li><li>Executive Director - <em>Firstname Lastname</em></li></ul></>,
  }
}
function toCapitalize(str:string) {
  return str.replace(/^./, t => t.toUpperCase());
}
function toTitleCase(str:string) {
  return str.replace(/(^|\s|-)\S/g, t => t.toUpperCase());
}
function transformKeyword(str:string, transform:string){
  switch(transform){
    case 'c':
      return toCapitalize(str)
    case 'u':
      return str.toUpperCase()
    case 'l':
      return str.toLowerCase()
    case 't':
      return toTitleCase(str)
    default:
      return str
  }
}
function getTarget(child:HTMLElement, depth:number, selector:string){
  let parent = child
  for(let i = 0; i < depth; i++){
    if(parent.parentElement){
      parent = parent.parentElement
    }
  }
  if(selector != '' && parent.querySelector(selector) != null){
    return parent.querySelector(selector)
  } else {
    return parent
  }
}
const underlineStyle: React.CSSProperties = {
  borderBottom:'0.1em solid',
  cursor:'help',
}
const popupStyle: React.CSSProperties = {
  background:'white',
  borderRadius:'0.25em',
  display:'none',
  padding:'1em',
  margin:0,
  maxWidth: '1080px',
  position:'fixed',
  zIndex:250,
}
const CandidateTest = ({ children, targetParentDepth, targetSelector, replaceBy, transform, underline, popup, byClick }:Props) => {
  const CandidateTestRef = useRef<HTMLSpanElement>(null)
  const objKey = children ? children.toString().toLowerCase().trim() : 'undefined'
  if(! (objKey in candidateTestData)){
    console.log(`ERROR: Key '${objKey}' not exists in candidateTestData!`)
  }
  const anchorId = objKey.replace(/\W/g,'_')
  let content = <></>
  if(targetParentDepth){
    replaceBy = ''
    transform = 'n'
    underline = false
  }
  switch(replaceBy){
    case '_none':
      content = <>{transformKeyword(children ? children.toString():'', transform)}</>
      break
    case '_alt':
      const alternative = transformKeyword(candidateTestData[objKey].alt, transform)
      content = <>{alternative}</>
      break
    case '_def':
      transform = 'n'
      underline = false
      popup = 'none'
      content = candidateTestData[objKey].definition
      break
    default:
      content = <>{transformKeyword(replaceBy, transform)}</>
      break
  }
  const popupDivContent = objKey in candidateTestData ? candidateTestData[objKey].definition : null
  const popupDiv = (
    <div className='Popup theme_dark_shadow' style={popupStyle}>
      {popupDivContent}
    </div>
  )
  function handleTargetMouseOverOrDown(){
    if(popup === 'none'){
      return
    }
    const popupDiv = document.querySelector('#popupAnchor_' + anchorId + ' .Popup') as HTMLDivElement
    if(popupDiv && CandidateTestRef && CandidateTestRef.current){
      popupDiv.style.display = 'block'
      popupDiv.style.visibility = 'hidden'
      const popupOffset = popupDiv.getBoundingClientRect();
      const target = getTarget(CandidateTestRef.current, targetParentDepth, targetSelector)
      const positionAnchor = target ? target : CandidateTestRef.current
      const targetOffset = positionAnchor.getBoundingClientRect();
      const windowHeight = window.innerHeight
      const windowWidth = window.innerWidth
      const targetCenterX = targetOffset.left + targetOffset.width/2 
      const targetTopY = targetOffset.top - 5
      let bottomPx = windowHeight - targetTopY
      let leftPx = targetCenterX - popupOffset.width/2
      let topPx = -1
      let rightPx = -1
      if(popupOffset.width > windowWidth){
        leftPx = 5
        rightPx = 5
      } else {
        if (leftPx < 0){
          leftPx = 5
          rightPx = windowWidth - (leftPx + popupOffset.width)
        } else if(leftPx + popupOffset.width > windowWidth){
          leftPx = -1
          rightPx = 5
        }
      }
      if(bottomPx + popupOffset.height > windowHeight){
        topPx = targetOffset.top + targetOffset.height + 5
        bottomPx = -1
      }
      popupDiv.style.left = leftPx >= 0 ? `${leftPx}px` : ''
      popupDiv.style.right = rightPx >= 0 ? `${rightPx}px` : ''
      popupDiv.style.top = topPx >= 0 ? `${topPx}px` : ''
      popupDiv.style.bottom = bottomPx >= 0 ? `${bottomPx}px` : ''
      popupDiv.style.visibility = 'visible'
      if(popupDivContent != null && ReactDOMServer.renderToStaticMarkup(popupDivContent).length < 30){
        setTimeout(() => {
          popupDiv.style.display = 'none'
          popupDiv.style.left = ''
          popupDiv.style.right = ''
          popupDiv.style.top = ''
          popupDiv.style.bottom = ''
        }, 2000);
      }
    }
  }
  function handleTargetMouseOutOrUp(){
    const popupDiv = document.querySelector('#popupAnchor_' + anchorId + ' .Popup') as HTMLDivElement
    if(popup != 'none' && popupDiv){
      popupDiv.style.display = 'none'
      popupDiv.style.left = ''
      popupDiv.style.right = ''
      popupDiv.style.top = ''
      popupDiv.style.bottom = ''
    }
  }
  function handleClick(){
    if(popupDivContent){
      showModalWith({content:popupDivContent})
    }
  }
  useEffect(() => {
    if(!byClick && popup != 'none'){
      let container = document.querySelector('.popupContainer')
      if(container == null){
        container = document.createElement('div')
        container.classList.add('popupContainer')
        document.body.appendChild(container)
      }
      if(document.querySelector('#popupAnchor_' + anchorId) == null){
        const anchor = document.createElement('div')
        anchor.id = 'popupAnchor_' + anchorId
        anchor.style.position = 'relative'
        container.appendChild(anchor)
        ReactDOM.render(popupDiv, anchor)
      }
    }
    return () => {
      if(!byClick && popup != 'none'){
        const anchor = document.querySelector('#popupAnchor_' + anchorId)
        anchor?.parentElement?.removeChild(anchor)
      }
    }
  }, [])
  useEffect(() => {
    if(targetParentDepth && CandidateTestRef && CandidateTestRef.current){
      const target = getTarget(CandidateTestRef.current, targetParentDepth, targetSelector)
      if(target){
        if(byClick){
          target.addEventListener('click', handleClick)
        } else {
          target.addEventListener('mouseover', handleTargetMouseOverOrDown)
          target.addEventListener('mousedown', handleTargetMouseOverOrDown)
          target.addEventListener('mouseout', handleTargetMouseOutOrUp)
        }
      }
    }
    return () => {
      if(targetParentDepth && CandidateTestRef && CandidateTestRef.current){
        const target = getTarget(CandidateTestRef.current, targetParentDepth, targetSelector)
        if(target){
          if(byClick){
            target.removeEventListener('click', handleClick)
          } else {
            target.removeEventListener('mouseover', handleTargetMouseOverOrDown)
            target.removeEventListener('mousedown', handleTargetMouseOverOrDown)
            target.removeEventListener('mouseout', handleTargetMouseOutOrUp)
          }
        }
      }
    }
  }, [])
  let CandidateTestStyle: React.CSSProperties = {}
  if(underline){
    CandidateTestStyle = underlineStyle
  }
  if(targetParentDepth){
    CandidateTestStyle = {...CandidateTestStyle, display:'none'}
  }
  return (
    <span ref={CandidateTestRef} className='CandidateTest' style={CandidateTestStyle}
    onMouseOver={targetParentDepth ? ()=>{} : handleTargetMouseOverOrDown}
    onMouseDown={targetParentDepth ? ()=>{} : (byClick ? handleClick : handleTargetMouseOverOrDown )}
    onMouseOut={targetParentDepth ? ()=>{} : handleTargetMouseOutOrUp}
    >
      {content}
    </span>
  )
}
CandidateTest.defaultProps = {
  replaceBy: '_none',
  targetParentDepth: 0,
  targetSelector: '',
  transform: 'n', 
  underline: true,
  popup: 'desktop', 
  byClick: false,
}
