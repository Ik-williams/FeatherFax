import React, { Component, Fragment, useEffect } from 'react'
import { Me } from '../../../../../utils/utils'
import { isAdmin } from '../../../../../utils/admin-utils'
import { deleteStory } from '../../../../../utils/story-utils'
import Prompt from '../../../../others/prompt'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MaterialIcon from '../../../../others/icons/material-icon'

import * as StoryUtils from '../../../../../utils/story-utils'

//import { getUserStories} from '../../../../actions/story'
//import { getUserStories} from '../../../../../actions/story'

//scrapped
//used automatic query event scheduler in php my admin

const AutoDeleteStory = (props) =>  {
    let ticking

    useEffect(() => {
        let {stories} = props
        if(stories) {
            ticking = setInterval(() => autoDelete(stories), 10000)
            console.log('mount it!');
        }
        return () => {
            clearInterval(ticking)
            console.log('unmounted')
        }
    })

    /*const componentDidMount = () => {
        let {stories} = props
        ticking = setInterval(() => autoDelete(stories), 10000)
    }

    const componentWillUnmount = () => {
        clearInterval(ticking)
    }*/

    const dateDiff = (p_Interval, p_Date1, p_Date2, p_FirstDayOfWeek) => {
        p_FirstDayOfWeek = (isNaN(p_FirstDayOfWeek) || p_FirstDayOfWeek==0) ? vbSunday : parseInt(p_FirstDayOfWeek);

        var dt1 = Date.CDate(p_Date1);
        var dt2 = Date.CDate(p_Date2);

        //correct Daylight Savings Ttime (DST)-affected intervals ("d" & bigger)
        if("h,n,s,ms".indexOf(p_Interval.toLowerCase())==-1){
            if(p_Date1.toString().indexOf(":") ==-1){ dt1.setUTCHours(0,0,0,0) };	// no time, assume 12am
            if(p_Date2.toString().indexOf(":") ==-1){ dt2.setUTCHours(0,0,0,0) };	// no time, assume 12am
        }


        // get ms between UTC dates and make into "difference" date
        var iDiffMS = dt2.valueOf() - dt1.valueOf();
        var dtDiff = new Date(iDiffMS);

        // calc various diffs
        var nYears  = dt2.getUTCFullYear() - dt1.getUTCFullYear();
        var nMonths = dt2.getUTCMonth() - dt1.getUTCMonth() + (nYears!=0 ? nYears*12 : 0);
        var nQuarters = parseInt(nMonths / 3);

        var nMilliseconds = iDiffMS;
        var nSeconds = parseInt(iDiffMS / 1000);
        var nMinutes = parseInt(nSeconds / 60);
        var nHours = parseInt(nMinutes / 60);
        var nDays  = parseInt(nHours / 24);	//now fixed for DST switch days
        var nWeeks = parseInt(nDays / 7);

        if(p_Interval.toLowerCase()=='ww'){
            // set dates to 1st & last FirstDayOfWeek
            var offset = Date.DatePart("w", dt1, p_FirstDayOfWeek)-1;
            if(offset){	dt1.setDate(dt1.getDate() +7 -offset);	}
            var offset = Date.DatePart("w", dt2, p_FirstDayOfWeek)-1;
            if(offset){	dt2.setDate(dt2.getDate() -offset);	}
            // recurse to "w" with adjusted dates
            var nCalWeeks = Date.DateDiff("w", dt1, dt2) + 1;
        }

        // return difference
        switch(p_Interval.toLowerCase()){
            case "yyyy": return nYears;
            case "q": return nQuarters;
            case "m": return nMonths;
            case "y": // day of year
            case "d": return nDays;
            case "w": return nWeeks;
            case "ww":return nCalWeeks; // week of year
            case "h": return nHours;
            case "n": return nMinutes;
            case "s": return nSeconds;
            case "ms":return nMilliseconds;
            default : return "invalid interval: '" + p_Interval + "'";
        }
    }

    const deleteStory = story => {
        let {
            dispatch,
        } = props,
        { story_id } = story, when = 'user'
        deleteStory({
            story_id,
            when,
            dispatch,
            redirect: () => '#',
        })

    }

    const expiredStoryOrNot = async story => {
        let { story_id } = story,
            { data: saved } = await post('/api/saved-or-not', {
            story: story_id,
        })
        return saved
    }

    const autoDelete = async stories => {
        for(var story of stories) {
            let saved = expiredStoryOrNot(story),
            { story_time } = story,
            y2k  = story_time,
            today= new Date(),
            date_diff = dateDiff('d', y2k, today)
            if( ( saved == false ) && ( date_diff >= 1 ) ) {
                deleteStory(story)
            }
        }
    }

    return (
            <div></div>
        )
}

/*AutoDeleteStory.propTypes = {
    storyDetails: PropTypes.shape({
        user: PropTypes.number.isRequired,
        story_id: PropTypes.number.isRequired,
        when: PropTypes.string.isRequired,
    }).isRequired,
}
*/
//export default AutoDeleteStory
//export { AutoDeleteStory as PureAutoDeleteStory }
const mapStateToProps = state => ({
    stories: state.Story.stories,
})

export default connect(mapStateToProps)(AutoDeleteStory);
