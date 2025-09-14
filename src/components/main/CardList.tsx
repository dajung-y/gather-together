'use client'

import { getCategoryLabel } from '@/utils/category';
import StudyCard from '../common/StudyCard';
import { Study } from '@/types/study';

interface CardListProps {
  studies: Study[];
}

export default function CardList ({studies}: CardListProps) {
  console.log('CardList로 넘어온 studies: ',studies);
  return(
    <div className="
      grid grid-cols-1 gap-8
      md:grid-cols-2 md:gap-8
      lg:grid-cols-4 lg:gap-12">
      {studies.map((study) => (
        <article key={study._id.toString()}
                 className='flex justify-center w-full h-full items-stretch'>
          <StudyCard 
            variant={study.isRecruiting ? "mainOpen" : "memberClosed"}
            studyId={study._id.toString()}
            name={study.studyName}
            title={study.title}
            startDate={new Date(study.startDate)}
            endDate={new Date(study.endDate)}
            time={study.startTime}
            currentMembers={study.currentMembers}
            maxMembers={study.capacity}
            isRecruiting={study.isRecruiting}
            tag={getCategoryLabel(study.category)} />
        </article>
      ))}
    </div>
  )
}