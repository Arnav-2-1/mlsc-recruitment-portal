import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { HeroHeader } from '../components/home/HeroHeader';
import { ExamInfoCard } from '../components/home/ExamInfoCard';
import { CandidateCard } from '../components/home/CandidateCard';
import { BottomFeatures } from '../components/home/BottomFeatures';

export const Home = () => {
    return (
        <PageContainer className="justify-center py-12">
            <HeroHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
                <ExamInfoCard />
                <CandidateCard />
            </div>
            <BottomFeatures />
        </PageContainer>
    );
}; 