import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  IconButton,
  Paper
} from '@mui/material';
import {
  Send,
  SmartToy,
  Close
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { pollinationsService } from '../services/pollinationsService';

const ChatContainer = styled(Paper)(({ theme }) => ({
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser?: boolean }>(({ theme, isUser }) => ({
  display: 'flex',
  marginBottom: theme.spacing(1),
  justifyContent: isUser ? 'flex-end' : 'flex-start',
}));

const UserMessage = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  maxWidth: '70%',
  wordBreak: 'break-word',
}));

const AIMessage = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[100],
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  maxWidth: '70%',
  wordBreak: 'break-word',
}));


const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  background: 'white',
}));

interface Message {
  id: string;
  type: 'text';
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAssistantProps {
  onChatClose?: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onChatClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'text',
      content: "Hello! I'm your AI assistant. I can help you with information about our internet plans, speed tests, or any questions you might have. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      await generateTextResponse(inputValue);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'text',
        content: `I apologize, but I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try asking your question again.`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTextResponse = async (prompt: string) => {
    try {
      console.log('Generating text response for:', prompt);
      
      // Try the Pollinations API first
      const result = await pollinationsService.generateText(prompt);
      
      console.log('API Result:', result);
      
      if (!result.success) {
        console.error('API Error:', result.error);
        throw new Error(result.error || 'Failed to generate text response');
      }
      
      if (!result.data) {
        console.error('No data received from API');
        throw new Error('No response received from AI service');
      }
      
      console.log('API Response:', result.data);
      
      const response = result.data.trim();
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'text',
        content: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error in generateTextResponse:', error);
      
      // Business-appropriate fallback response
      const userPrompt = prompt.toLowerCase();
      let fallbackResponse = "Hello! I'm your AI assistant. I'm here to help you with information about our internet plans, speed tests, and any questions you might have. How can I assist you today?";
      
      // Provide more specific fallback responses based on user input
      if (userPrompt.includes('plan') || userPrompt.includes('price') || userPrompt.includes('package')) {
        fallbackResponse = "I'd be happy to help you with information about our internet plans! We offer various packages to suit different needs. Could you tell me what you're looking for in terms of speed, data limits, or budget?";
      } else if (userPrompt.includes('speed') || userPrompt.includes('fast') || userPrompt.includes('slow')) {
        fallbackResponse = "I can help you with speed-related questions! Our internet speeds vary depending on the plan you choose. Are you experiencing slow speeds, or would you like to know more about our available speed tiers?";
      } else if (userPrompt.includes('install') || userPrompt.includes('setup') || userPrompt.includes('connection')) {
        fallbackResponse = "I can help with installation and connection questions! Our professional technicians can assist with setup, or we can guide you through self-installation. What specific installation questions do you have?";
      } else if (userPrompt.includes('bill') || userPrompt.includes('payment') || userPrompt.includes('cost')) {
        fallbackResponse = "I can help with billing and payment inquiries! We offer various payment methods and can provide information about your current charges. What specific billing questions do you have?";
      }
      
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        type: 'text',
        content: fallbackResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <Card sx={{ width: { xs: '100%', md: '400px' }, height: '600px', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <SmartToy sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight="bold">AI Assistant</Typography>
          </Stack>
          <IconButton size="small" onClick={onChatClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Messages */}
        <ChatContainer>
          <MessageContainer>
            {messages.map((message) => (
              <MessageBubble key={message.id} isUser={message.isUser}>
                {message.isUser ? (
                  <UserMessage>
                    <Typography variant="body1">{message.content}</Typography>
                  </UserMessage>
                ) : (
                  <AIMessage>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                      {message.content}
                    </Typography>
                  </AIMessage>
                )}
              </MessageBubble>
            ))}
            
            {isLoading && (
              <MessageBubble>
                <AIMessage>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CircularProgress size={16} />
                    <Typography variant="body2">AI is thinking...</Typography>
                  </Stack>
                </AIMessage>
              </MessageBubble>
            )}
            
            
            <div ref={messagesEndRef} />
          </MessageContainer>

          {/* Input */}
          <InputContainer>
            <Stack spacing={1}>
              <TextField
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  startIcon={<Send />}
                  sx={{ borderRadius: 2 }}
                >
                  Send
                </Button>
              </Box>
            </Stack>
          </InputContainer>
        </ChatContainer>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;