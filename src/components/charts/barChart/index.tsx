import DefaultCard from '@/components/cards/default';
import Skeleton from '@/components/common/skeleton';
import { useContext, useMemo } from 'react';
import './_styles.scss';
import If from '@/components/common/if';
import ReactECharts from 'echarts-for-react';
import { ThemeContext } from '@/context/themeContext';

interface IProps {
    children?: JSX.Element;
    width?: string;
    yAxesWidth?: string;
    height?: string;
    data?: any[];
    dates?: string[];
    loading: boolean;
}

export default function BarChart({
    width,
    height,
    data,
    yAxesWidth,
    children,
    loading,
    dates
}: IProps): JSX.Element {
    const { theme } = useContext(ThemeContext);
    const sizes = useMemo(() => {
        const w = width || '100%';
        const h = height || '300px';
        const yw = yAxesWidth || '50px';
        return [w, h, yw];
    }, [width, height, yAxesWidth]);

    const options = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#ccc',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0
                }
            }
        },
        xAxis: {
            data: dates
        },
        yAxis: {
            type: 'value'
        },
        series: data,
        legend: {},
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
        }
    };

    return (
        <DefaultCard className="chartbar" padding="24px 32px">
            {children ? children : <></>}
            <If condition={loading}>
                <Skeleton width={sizes[0]} height={sizes[1]} />
            </If>
            <If condition={!loading}>
                <div className="chartbar-content" style={{ height: sizes[1] }}>
                    <ReactECharts option={options} theme={theme} />
                </div>
            </If>
        </DefaultCard>
    );
}
