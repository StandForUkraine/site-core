import { SocialFeedPost } from 'core/utils/social-feed/feed';
import { PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import { FacebookEmbed, TwitterEmbed, InstagramEmbed, YouTubeEmbed, TikTokEmbed } from 'react-social-media-embed';
import styled from 'styled-components';

export class SocialEmbedPostWidget extends PureComponent<{ post: SocialFeedPost }> {
  componentDidCatch() {
    // Supress error
  }
  
  render() {
    const { post } = this.props;
    
    return (
    <Wrapper>
      <LazyLoad once offset={500}>
        {
          post.network === 'facebook' && (
            <FacebookEmbedStyled url={post.link} />
          ) 
        }
        {
          post.network === 'twitter' && (
            <TwitterEmbedStyled url={post.link} />
          )
        }
        {
          post.network === 'instagram' && (
            <IntagramEmbedStyled url={post.link} />
          )
        }
        {
          post.network === 'youtube' && (
            <YoutubeEmbedStyled url={post.link} />
          )
        }
        {
          post.network === 'tiktok' && (
            <TikTokEmbedStyled url={post.link} />
          )
        }
      </LazyLoad>
    </Wrapper>
  );
  }
}

export default SocialEmbedPostWidget;

const Wrapper = styled.div`
  padding: 20px;
  max-width: 556px;
  width: 100%;
  display: inline-block;

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 1280px) {
    width: calc(100% / 3);
  }
`

const IntagramEmbedStyled = styled(InstagramEmbed).attrs({
  width: '100%',
})`
  iframe {
    padding-right: 1px !important;
  }

  @media (min-width: 768px) {
    iframe {
      max-width: 330px;
    }
  }

  @media (min-width: 1280px) {
    iframe {
      max-width: 330px;
    }
  }
`
const FacebookEmbedStyled = styled(FacebookEmbed).attrs({
  width: '100%',
})`
  iframe {
    padding-right: 1px !important;
  }
`
const TwitterEmbedStyled = styled(TwitterEmbed).attrs({
  width: '100%',
})`
  iframe {
    padding-right: 1px !important;
  }
`

const YoutubeEmbedStyled = styled(YouTubeEmbed).attrs({
  width: '100%',
})`
  iframe {
    padding-right: 1px !important;
  }
`

const TikTokEmbedStyled = styled(TikTokEmbed).attrs({
  width: '100%',
})`
  iframe {
    padding-right: 1px !important;
  }
`
