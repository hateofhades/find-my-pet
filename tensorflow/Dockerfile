FROM python:3.8-alpine
COPY . /app
EXPOSE 5000/tcp
WORKDIR /app
RUN pip3 install -r requirements.txt
CMD ["cd ","/app", "python3","model.py"]