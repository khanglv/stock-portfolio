import * as React from 'react';
import * as storage from '../../api/storage';
import { Alert } from 'antd';
import './styles.css';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent {
	static defaultProps = {
		symbol: 'VNM',
		interval: 'D',
		containerId: 'tv_chart_container',
		// datafeedUrl: 'https://demo_feed.tradingview.com',
		datafeedUrl: 'https://trading.vcsc.com.vn/rest/api/v1/tradingview',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		timezone: "Asia/Ho_Chi_Minh",
		fullscreen: false,
		autosize: true,
		studiesOverrides: {}
	};

	tvWidget = null;

	token = storage.accessTokenCore();

	componentDidMount() {
		if(this.token){
			const widgetOptions = {
				symbol: this.props.symbol,
				// BEWARE: no trailing slash is expected in feed URL
				datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl, this.token),
				interval: this.props.interval,
				container_id: this.props.containerId,
				library_path: this.props.libraryPath,
				timezone: this.props.timezone,
				locale: getLanguageFromURL() || 'vi',
				disabled_features: ['use_localstorage_for_settings'],
				enabled_features: ['study_templates'],
				charts_storage_url: this.props.chartsStorageUrl,
				charts_storage_api_version: this.props.chartsStorageApiVersion,
				client_id: this.props.clientId,
				user_id: this.props.userId,
				fullscreen: this.props.fullscreen,
				autosize: this.props.autosize,
				studies_overrides: this.props.studiesOverrides,
			};
	
			const tvWidget = new window.TradingView.widget(widgetOptions);
			this.tvWidget = tvWidget;
	
			tvWidget.onChartReady(() => {
				tvWidget.headerReady().then(() => {
					const button = tvWidget.createButton();
					button.setAttribute('title', 'Click to show a notification popup');
					button.classList.add('apply-common-tooltip');
					button.addEventListener('click', () => tvWidget.showNoticeDialog({
						title: 'Notification',
						body: 'TradingView Charting Library API works correctly',
						callback: () => {
							console.log('Noticed!');
						},
					}));
	
					button.innerHTML = 'Check API';
				});
			});
		}
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		return (
			this.token ? 
					<div
						id={ this.props.containerId }
						className={ 'TVChartContainer' }
					/> 
				: 
					<div style={{display: 'flex', justifyContent: 'center', paddingTop: 50}}>
                        <Alert 
                            type="warning" 
                            showIcon
                            message="????ng nh???p b???ng t??i kho???n ch???ng kho??n ???? nhoa ^^!" 
                        />
					</div>
		);
	}
}
